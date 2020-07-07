import { Component, OnInit, Input, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetPickerComponent } from '../asset-picker/asset-picker.component';
import { CarouselEditorComponent } from '../carousel-editor/carousel-editor.component';
import { v4 as guid } from 'uuid';
import { SectionPickerComponent } from '../section-picker/section-picker.component';
import {
  OC_TINYMCE_WIDGET_ATTRIBUTE,
  OC_TINYMCE_SECTION_WIDGET_ID
} from 'plugin/src/constants/widget.constants';
import { MarketplaceSDK, Asset } from 'marketplace-javascript-sdk';
import * as MarketplaceSdkInstance from 'marketplace-javascript-sdk';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {
  @Input() renderSiteUrl: string;
  @Input() initialValue: string;
  @Input() editorOptions: any;
  resolvedEditorOptions: any = {};

  tinymceId = `tiny-angular_${guid()}`;

  defaultEditorOptions = {
    base_url: '/tinymce',
    suffix: '.min',
    content_css:
      'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
    content_style: `
    body {
      padding:15px !important;
    }
    #tinymce[contenteditable="true"] .c-slide-container img { 
      display: none;
    }

    #tinymce[contenteditable="true"] .c-slide-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #tinymce[contenteditable="true"] .c-slide-container::before {
      content: '';
      width: 100%;
      height: 200px;
      position: absolute;
      background-color: lightgray;
    }
    #tinymce[contenteditable="true"] .c-slide-container::after {
      font-weight: bold;
      content: 'Carousel preview not available in edit mode. Click View > Preview';
      z-index: 0;
    }
    `,
    height: 500,

    plugins: [
      'ordercloud print preview paste importcss searchreplace autolink autosave save directionality',
      'code visualblocks visualchars fullscreen image link media template codesample table charmap',
      'hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools',
      'textpattern noneditable help charmap emoticons'
    ],
    menubar: 'file edit view insert format tools table help',
    toolbar: [
      'oc-carousel oc-product oc-section',
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat'
    ],
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    imagetools_toolbar:
      'rotateleft rotateright | flipv fliph | editimage imageoptions',
    contextmenu: 'link image imagetools table oc-product oc-row oc-col',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    importcss_append: true,
    toolbar_mode: 'sliding',
    extended_valid_elements: 'script[src|async|defer|type|charset]',

    /**
     * Adds an advanced tab to set things like style/border/space
     */
    image_advtab: true,

    /**
     * Adds an upload tab (uploads to ordercloud cms)
     */
    image_uploadtab: true,
    images_upload_handler: function(blobInfo, successCallback, errorCallback) {
      // importing tinymce breaks things so we have to use instance from window
      window['tinymce'].execCommand('ocAssetUploader', true, {
        blobInfo,
        successCallback,
        errorCallback
      });
    },

    /**
     * Adds ability to transform images
     */

    imagetools_cors_hosts: ['marktplacetest.blob.core.windows.net']
  };

  constructor(private modalService: NgbModal, public zone: NgZone) {}

  ngOnInit(): void {
    Object.assign(
      this.resolvedEditorOptions,
      this.defaultEditorOptions,
      this.editorOptions
    );

    // I think we need to set this here *and* in the plugin because it sets
    // it on different instances of the sdk
    MarketplaceSdkInstance.Configuration.Set({
      baseApiUrl: this.resolvedEditorOptions.ordercloud.marketplaceUrl
    });

    this.resolvedEditorOptions.file_picker_callback = (callback, value, meta) => {
      this.zone.run(() => {
        this.openAssetPicker.bind(this)(callback, value, meta)
      })
    }
    this.resolvedEditorOptions.ordercloud.open_carousel_editor = editor => {
      this.zone.run(() => {
        // we need to manually trigger change detection
        // because this is running outside of the scope of angular
        this.openCarouselEditor.bind(this)(editor);
      });
    };
    this.resolvedEditorOptions.ordercloud.open_section_picker = editor => {
      this.zone.run(() => {
        this.openSectionPicker.bind(this)(editor);
      });
    };
  }

  openAssetPicker(callback, value, meta) {
    const modalRef = this.modalService.open(AssetPickerComponent);
    modalRef.result.then((asset: Asset) => {
      if(meta.filetype === 'image') {
        callback(asset.Url, asset.Title)
      } else if(meta.filetype === 'file') {
        // TODO: do
        console.error('Filetype is not yet implemented')
      } else if(meta.filetype === 'media') {
        // TODO: do
        console.error('Filetype is not yet implemented')
      }
    })
  }

  openCarouselEditor(editor) {
    const modalRef = this.modalService.open(CarouselEditorComponent, {
      size: 'xl'
    });
    modalRef.result.then(html => {
      editor.insertContent(html);
    });
  }

  openSectionPicker(editor) {
    const modalRef = this.modalService.open(SectionPickerComponent, {
      size: 'xl'
    });
    modalRef.result.then(html => {
      editor.insertContent(
        `<div ${OC_TINYMCE_WIDGET_ATTRIBUTE}=${OC_TINYMCE_SECTION_WIDGET_ID}>
          ${html}
        </div>`
      );
    });
    modalRef.componentInstance.remoteCss = editor.settings.content_css[0];
  }
}
