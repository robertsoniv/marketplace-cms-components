import { Component, OnInit, Input } from '@angular/core';
import cmsUpload from './cms-asset-upload/cms-asset-upload'
import cmsPicker from './cms-asset-picker/cms-asset-picker';
import * as MarketplaceSdkInstance from 'marketplace-javascript-sdk';
import { MarketplaceSDK } from 'marketplace-javascript-sdk';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {
  @Input() ocToken: string;
  @Input() remoteCss: string;
  @Input() initialValue: string;

  editorOptions = {
    base_url: '/tinymce',
    suffix: '.min',
    content_css: this.remoteCss,
    content_style: 'body {padding:15px !important;}',
    height: 500,
    menubar: 'insert',
    plugins: [
      'image table advlist autolink lists link charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'oc-product image undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent table | removeformat | help',
    ocToken: this.ocToken,

    /**
     * Allows user to browse and select images from ordercloud cms
     */
    file_picker_callback: cmsPicker,

    /**
     * Adds an advanced tab to set things like style/border/space
     */
    image_advtab: true,

    /**
     * Adds an upload tab (uploads to ordercloud cms)
     */
    image_uploadtab: true,
    images_upload_handler: cmsUpload
  }

  constructor() { }

  ngOnInit(): void { 
    MarketplaceSdkInstance.Configuration.Set({baseApiUrl: 'https://marketplace-middleware-test.azurewebsites.net'})
    MarketplaceSDK.Tokens.SetAccessToken(this.ocToken);
  }
}

