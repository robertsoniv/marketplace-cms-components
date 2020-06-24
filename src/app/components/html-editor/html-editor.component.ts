import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetPickerComponent } from '../asset-picker/asset-picker.component';
import { CarouselEditorComponent } from '../carousel-editor/carousel-editor.component';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent implements OnInit {
  @Input() renderSiteUrl: string;
  @Input() initialValue: string;
  @Input() editorOptions: any;
  resolvedEditorOptions: any = {};

  defaultEditorOptions = {
    base_url: '/tinymce',
    suffix: '.min',
    content_css:
      'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
    content_style: 'body {padding:15px !important;}',
    height: 500,

    plugins: [
      'ordercloud print preview paste importcss searchreplace autolink autosave save directionality',
      'code visualblocks visualchars fullscreen image link media template codesample table charmap',
      'hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools',
      'textpattern noneditable help charmap quickbars emoticons'
    ],
    menubar: 'file edit view insert format tools table help',
    toolbar:
      'oc-carousel oc-product undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat',
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    imagetools_toolbar:
      'rotateleft rotateright | flipv fliph | editimage imageoptions',
    contextmenu: 'link image imagetools table oc-product',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    importcss_append: true,
    toolbar_mode: 'sliding',

    // /**
    //  * Allows user to browse and select images from ordercloud cms
    //  */
    // file_picker_callback: function(callback, value, meta) {
    //   // importing tinymce breaks things so we have to use instance from window
    //   window['tinymce'].execCommand('ocAssetPicker', true, {
    //     callback,
    //     value,
    //     meta
    //   });
    // },

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

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    Object.assign(
      this.resolvedEditorOptions,
      this.defaultEditorOptions,
      this.editorOptions
    );

    this.resolvedEditorOptions.file_picker_callback = this.openAssetPicker.bind(this);
    this.resolvedEditorOptions.ordercloud.open_carousel_editor = this.openCarouselEditor.bind(this);
  }

  openAssetPicker(callback, value, meta) {
    const modalRef = this.modalService.open(AssetPickerComponent);
    modalRef.componentInstance.onSuccess = callback;
    modalRef.componentInstance.fileMeta = meta;
  }

  openCarouselEditor(callback, value, meta) {
    const modalRef = this.modalService.open(CarouselEditorComponent, {size: 'xl'});
    modalRef.componentInstance.onSuccess = callback;
    modalRef.componentInstance.fileMeta = meta;
  }
}
