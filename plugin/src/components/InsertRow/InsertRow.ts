declare const tinymce: any;

type ContextMenu = {
  update: (element: Element) => string;
};

const contextMenuRow: ContextMenu = {
  update: () => 'oc-row',
};

const rowMarkup = `
  <div class="row" style="border: 1px solid green;">
    &&
  </div>
`;

export default (editor, url) => {
  editor.ui.registry.addMenuItem('oc-row', {
    text: 'Insert Row',
    onAction: () => {
      return tinymce.activeEditor.selection.setContent(rowMarkup);
    },
  });

  editor.ui.registry.addContextMenu('oc-row', contextMenuRow);
};
