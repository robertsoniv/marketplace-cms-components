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
  @Input() initialValue: string;
  @Input() editorOptions: any;
  resolvedEditorOptions: any = {};

  defaultEditorOptions = {
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
    images_upload_handler: cmsUpload,

    /**
     * Adds ability to transform images
     */
    imagetools_cors_hosts: ['marktplacetest.blob.core.windows.net'],

    
  }

  constructor() { }

  ngOnInit(): void {
    Object.assign(this.resolvedEditorOptions, this.editorOptions, this.defaultEditorOptions);
    MarketplaceSdkInstance.Configuration.Set({baseApiUrl: 'https://marketplace-middleware-test.azurewebsites.net'})
    MarketplaceSDK.Tokens.SetAccessToken(this.ocToken);
  }
}

