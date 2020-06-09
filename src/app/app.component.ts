import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketplace-cms-components';
  editorOptions = {
    base_url: '/tinymce',
    suffix: '.min',
    content_css: 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
    content_style: 'body {padding:15px !important;}',
    height: 500,
    
    plugins: [
      'print preview paste importcss searchreplace autolink autosave save directionality',
      'code visualblocks visualchars fullscreen image link media template codesample table charmap',
      'hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools oc-product',
      'textpattern noneditable help charmap quickbars emoticons'
    ],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'oc-product undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat',
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
    contextmenu: "link image imagetools table",
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    importcss_append: true,
    toolbar_mode: 'sliding',
  }
}
