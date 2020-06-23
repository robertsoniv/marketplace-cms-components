declare const fetch: any;
import tinymce from 'tinymce';

export default (editor, url) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${editor.settings.ordercloud.access_token}`,
    },
  };

  const OC_TINYMCE_WIDGET_ATTRIBUTE = 'data-oc-widget';
  const OC_TINYMCE_PRODUCT_WIDGET_ID = 'product-display';

  const buildProductDisplayHtml = (product: any) => {
    return `
      <div ${OC_TINYMCE_WIDGET_ATTRIBUTE}="${OC_TINYMCE_PRODUCT_WIDGET_ID}" data-oc-product-id="${
      product.ID
    }">
        ${
          editor.settings.ordercloud.product_display_html_callback
            ? editor.settings.ordercloud.product_dislay_html_callback(product)
            : `
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">${product.Name}</h3>
              <p class="card-text">${product.Description}</p>
            </div>
          </div>
        `
        }
      </div><br/>`;
  };

  function isWidgetType(node: any, type: string) {
    let widgetName =
      typeof node.attr === 'function'
        ? node.attr(OC_TINYMCE_WIDGET_ATTRIBUTE)
        : editor.dom.getAttrib(node, OC_TINYMCE_WIDGET_ATTRIBUTE);
    const re = new RegExp(`\\b${type}\\b`);
    return widgetName && re.test(widgetName);
  }

  const openDialog = function (
    error: boolean,
    initialProducts?: any[],
    selectedProductId?: string
  ) {
    // https://www.tiny.cloud/docs/api/tinymce/tinymce.windowmanager/

    let selectedProduct: string = selectedProductId;

    // TODO: waiting on bugfix
    // I created a TinyMCE bug report for the checkbox controls
    // below the dialog initial visible area not being clickable
    // https://github.com/tinymce/tinymce/issues/5721

    function buildItems(e: boolean, products?: any[]) {
      if (e) {
        return [
          {
            type: 'alertbanner',
            level: 'error',
            icon: 'warning',
            text:
              "There was a problem connecting to OrderCloud. Please check that you've provided a valid token.",
          },
        ];
      }
      return [
        {
          label: 'Search',
          type: 'input',
          name: 'productSearch',
          placeholder: 'Search for a product...',
        },
        {
          type: 'label',
          label: 'Choose a product',
          items: buildProducts(products),
        },
      ];
    }

    function buildProducts(products): any[] {
      return products.map(p => ({
        type: 'checkbox',
        name: `product__${p.ID}`,
        label: `${p.Name}`,
      }));
    }

    let productSearchTimeout: NodeJS.Timeout | undefined;

    function onChange(api, details) {
      const data = api.getData();
      if (details.name === 'productSearch') {
        if (productSearchTimeout) {
          clearTimeout(productSearchTimeout);
        }
        productSearchTimeout = setTimeout(() => {
          fetch(
            `https://api.ordercloud.io/v1/me/products?search=${data.productSearch}`,
            fetchOptions
          ).then(response => {
            if (response.ok) {
              response.json().then(productList => {
                api.redial(
                  redialOptions(false, data.productSearch, productList.Items)
                );
                api.focus('productSearch');
              });
            } else {
              api.redial(redialOptions(true));
            }
          });
        }, 300);
      }
      if (details.name.includes('product__')) {
        const productID = details.name.split('__')[1];
        if (data[details.name]) {
          selectedProduct = productID;
        } else {
          selectedProduct = '';
        }
        let unselected: any = {};
        Object.keys(data).forEach(k => {
          if (k.includes('product__') && k !== details.name) {
            unselected[k] = false;
          }
        });
        api.setData(unselected);
      }
    }

    function onSubmit(api) {
      fetch(
        `https://api.ordercloud.io/v1/me/products/${selectedProduct}`,
        fetchOptions
      ).then(response => {
        if (response.ok) {
          response.json().then(product => {
            editor.insertContent(buildProductDisplayHtml(product));
            api.close();
          });
        } else {
          api.close();
        }
      });
    }

    const initialOptions = {
      title: 'Select a Product',
      // size: 'large',
      body: {
        type: 'panel',
        items: buildItems(error, initialProducts),
      },
      initialData: {
        productSearch: '',
      },
      buttons: [
        {
          type: 'cancel',
          text: 'Close',
        },
        {
          type: 'submit',
          text: 'Save',
          primary: true,
        },
      ],
      onChange,
      onSubmit,
    };

    function redialOptions(e: boolean, search?: string, p?: any[]) {
      const options = Object.assign({}, initialOptions);
      options.body.items = buildItems(e, p);
      options.initialData.productSearch = search || '';
      if (selectedProduct) {
        options.initialData[`product__${selectedProduct}`] = true;
      }
      return options;
    }

    if (selectedProduct) {
      initialOptions.initialData[`product__${selectedProduct}`] = true;
    }

    return editor.windowManager.open(initialOptions);
  };

  const initDialog = function (selectedProductId?: string) {
    fetch(`https://api.ordercloud.io/v1/me/products`, fetchOptions).then(
      response => {
        if (response.ok) {
          response.json().then(productList => {
            return openDialog(false, productList.Items, selectedProductId);
          });
        } else {
          return openDialog(true);
        }
      }
    );
  };

  editor.ui.registry.addButton('oc-product', {
    text: 'Insert a Product',
    onAction: () => {
      // tslint:disable-next-line:no-console
      initDialog();
    },
  });

  editor.ui.registry.addButton('oc-product-change', {
    icon: 'edit-block',
    tooltip: 'Change Product',
    onAction: () => {
      const productId = editor.dom.getAttrib(
        editor.selection.getNode(),
        'data-oc-product-id'
      );
      initDialog(productId);
    },
  });

  editor.ui.registry.addButton('oc-product-refresh', {
    icon: 'reload',
    tooltip: 'Refresh Product Data',
    onAction: () => {
      const productId = editor.dom.getAttrib(
        editor.selection.getNode(),
        'data-oc-product-id'
      );
      fetch(
        `https://api.ordercloud.io/v1/me/products/${productId}`,
        fetchOptions
      ).then(response => {
        if (response.ok) {
          response.json().then(product => {
            const html = buildProductDisplayHtml(product);
            editor.selection.setNode(null);
            editor.insertContent(html);
          });
        } else {
          alert('Product Not Found');
        }
      });
    },
  });

  editor.ui.registry.addButton('oc-product-remove', {
    icon: 'close',
    tooltip: 'Remove Product',
    onAction: () => {
      editor.selection.setNode(editor.dom.create('p'));
    },
  });

  editor.ui.registry.addContextToolbar('oc-product', {
    predicate: node => isWidgetType(node, OC_TINYMCE_PRODUCT_WIDGET_ID),
    items: 'oc-product-remove | oc-product-refresh oc-product-change',
    position: 'node',
    scope: 'node',
  });

  editor.on('preInit', function () {
    function toggleContentEditableState(state) {
      return function (nodes) {
        let i = nodes.length,
          node;

        function toggleContentEditable(node) {
          node.attr('contenteditable', state ? 'true' : null);
        }

        while (i--) {
          node = nodes[i];

          if (isWidgetType(node, OC_TINYMCE_PRODUCT_WIDGET_ID)) {
            node.attr('contenteditable', state ? 'false' : null);
            tinymce.each(node.getAll('a'), toggleContentEditable);
          }
        }
      };
    }

    editor.parser.addNodeFilter('div', toggleContentEditableState(true));
    editor.serializer.addNodeFilter('div', toggleContentEditableState(false));
  });
};
