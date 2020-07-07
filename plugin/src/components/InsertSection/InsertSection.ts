import {
  OC_TINYMCE_SECTION_WIDGET_ID,
  OC_TINYMCE_WIDGET_ATTRIBUTE
} from '../../constants/widget.constants';
import { isWidgetType } from '../../services/widget.service';

import tinymce from 'tinymce';

export default editor => {
  editor.ui.registry.addButton('oc-section', {
    text: 'Insert Section',
    onAction: () => {
      editor.settings.ordercloud.open_section_picker(editor);
    }
  });

  editor.on('preInit', function() {
    function toggleContentEditableState(state) {
      return function(nodes) {
        let i = nodes.length,
          node;

        function toggleContentEditable(node) {
          node.attr('contenteditable', state ? 'true' : null);
        }

        while (i--) {
          node = nodes[i];

          if (isWidgetType(editor, node, OC_TINYMCE_SECTION_WIDGET_ID)) {
            node.attr('contenteditable', state ? 'false' : null);
            tinymce.each(node.getAll('h1'), toggleContentEditable);
            tinymce.each(node.getAll('h2'), toggleContentEditable);
            tinymce.each(node.getAll('h3'), toggleContentEditable);
            tinymce.each(node.getAll('h4'), toggleContentEditable);
            tinymce.each(node.getAll('h5'), toggleContentEditable);
            tinymce.each(node.getAll('h6'), toggleContentEditable);
            tinymce.each(node.getAll('p'), toggleContentEditable);
            tinymce.each(node.getAll('a'), toggleContentEditable);
            tinymce.each(node.getAll('button'), toggleContentEditable);
            tinymce.each(node.getAll('figure'), toggleContentEditable);
            tinymce.each(node.getAll('img'), toggleContentEditable);
          }
        }
      };
    }

    editor.parser.addAttributeFilter(
      OC_TINYMCE_WIDGET_ATTRIBUTE,
      toggleContentEditableState(true)
    );
    editor.serializer.addAttributeFilter(
      OC_TINYMCE_WIDGET_ATTRIBUTE,
      toggleContentEditableState(false)
    );
  });
};
