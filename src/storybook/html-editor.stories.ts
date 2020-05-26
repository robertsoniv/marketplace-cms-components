import { moduleMetadata } from '@storybook/angular';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { HtmlEditorComponent } from 'src/app/components/html-editor/html-editor.component';

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
