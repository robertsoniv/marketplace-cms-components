export default editor => {
  editor.ui.registry.addButton('oc-section', {
    text: 'Insert Section',
    onAction: () => {
      editor.settings.ordercloud.open_section_picker(editor);
    }
  });
};
