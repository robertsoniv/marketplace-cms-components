import { PageComponent } from '../app/components/page/page.component';
import { ContentContainerComponent } from '../app/components/content-container/content-container.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { ContentBlockComponent } from '../app/components/content-block/content-block.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { moduleMetadata } from '@storybook/angular';
import { PageContentDoc } from 'src/app/models/PageContentDoc.interface';
import { HtmlEditorComponent } from 'src/app/components/html-editor/html-editor.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

export default {
  title: 'HTML Editor',
  component: HtmlEditorComponent,
  parameters: {
    component: HtmlEditorComponent
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [EditorModule],
      providers: [
        { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
      ],
      entryComponents: []
    })
  ]
};

export const BasicExample = () => ({
  component: HtmlEditorComponent,
  props: {}
});
