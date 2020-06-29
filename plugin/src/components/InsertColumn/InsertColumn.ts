// declare const tinymce: any;

type ContextMenu = {
  update: (element: Element) => string;
};

const contextMenuCol: ContextMenu = {
  update: element => (element.className == 'row' ? 'oc-col' : ''),
};

const colMarkup = `
    <div class="col-sm-6" style="border: 1px solid red;">
        <button class="btn btn-primary">Button</button>
    </div>
    `;

export default (editor, url) => {
  editor.ui.registry.addMenuItem('oc-col', {
    text: 'Insert Column',
    onAction: () => {
      // const rows = tinymce.activeEditor.dom
      //   .select('div')
      //   .filter(d => d.className == 'row');
      return editor.insertContent(colMarkup);
    },
  });

  editor.ui.registry.addContextMenu('oc-col', contextMenuCol);
};
