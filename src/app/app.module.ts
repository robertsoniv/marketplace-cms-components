import 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AppComponent } from './app.component';
import { HtmlEditorComponent } from './components/html-editor/html-editor.component';
import { FormsModule } from '@angular/forms';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
import { AssetPickerComponent } from './components/asset-picker/asset-picker.component';
import { CarouselEditorComponent } from './components/carousel-editor/carousel-editor.component';


@NgModule({
  declarations: [AppComponent, HtmlEditorComponent, PageEditorComponent, AssetPickerComponent, CarouselEditorComponent],
  imports: [BrowserModule, FormsModule, NgbModule, EditorModule, NgbModalModule],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  entryComponents: [AssetPickerComponent, CarouselEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
