import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AppComponent } from './app.component';
import { HtmlEditorComponent } from './components/html-editor/html-editor.component';
import { FormsModule } from '@angular/forms';
import { PageEditorComponent } from './components/page-editor/page-editor.component';

@NgModule({
  declarations: [AppComponent, HtmlEditorComponent, PageEditorComponent],
  imports: [BrowserModule, FormsModule, NgbModule, EditorModule],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
