import tinymce from 'tinymce';
import { MarketplaceSDK, Asset } from 'marketplace-javascript-sdk';

export default function cmsPicker(ignorethisparam, { callback, value, meta }) {
  const vm = this;
  vm.assetsContainerId = 'cms-picker-assets-container';
  vm.parameters = {
    page: 1,
    pageSize: 10,
    filters: {},
  };
  vm.list = { Meta: {}, Items: [] };

  (function onInit() {
    // initialize dialog
    vm.dialogConfig = getDialogConfig();
    vm.dialogInstanceApi = tinymce.activeEditor.windowManager.open(
      vm.dialogConfig
    );
    changePage();
  })();

  function changePage() {
    vm.dialogInstanceApi.block('Loading');

    return MarketplaceSDK.Assets.List(vm.parameters)
      .then(assetList => {
        vm.list = assetList;
        renderPage(vm.list.Items);
        vm.dialogInstanceApi.unblock();
      })
      .catch(() => vm.dialogInstanceApi.unblock());
  }

  function renderPage(assets: Asset[]) {
    const $container = document.getElementById(vm.assetsContainerId);

    if (!assets.length) {
      $container.innerHTML = `<div class="no-results">No assets found</div>`;
    } else {
      $container.innerHTML = assets
        .map(asset => {
          return `
                    <div class="cms-asset-item">
                        <a href="javascript:void(0)">
                            <img class="cms-asset-image" title="${asset.Title}" src="${asset.Url}"></img>
                        </a>
                    </div>
                `;
        })
        .join('');
      $container.querySelectorAll('.cms-asset-item a').forEach($element => {
        $element.addEventListener('click', selectAsset);
      });
    }

    setPaginationButtonsDisabled();
  }

  function setPaginationButtonsDisabled(): void {
    const $prevPage = document.querySelector(
      '.tox-button[title="previous page"]'
    ) as HTMLInputElement;
    const $nextPage = document.querySelector(
      '.tox-button[title="next page"]'
    ) as HTMLInputElement;
    $prevPage.disabled = isFirstPage();
    $nextPage.disabled = isLastPage();
  }

  function isFirstPage(): boolean {
    return vm.list.Meta.Page === 1;
  }

  function isLastPage(): boolean {
    const lastPage =
      Math.floor(vm.list.Items.length / vm.list.Meta.PageSize) + 1;
    return vm.list.Meta.Page === lastPage;
  }

  function selectAsset(event) {
    vm.dialogInstanceApi.close();
    const selected = event.currentTarget.children[0];
    const imageUrl = selected.src;
    const title = selected.title;
    if (meta.filetype === 'image') {
      callback(imageUrl, title);
    } else if (meta.filetype === 'file') {
      // TODO: handle files - figure out when this gets called
    } else if (meta.filetype === 'media') {
      // TODO: handle media - figure out when this gets called
    }
  }

  function debounce(func, wait?: any, immediate?: any) {
    // taken from underscore source codebase
    let timeout;
    return function () {
      let context = this,
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const debouncedChangePage = debounce(changePage, 600);

  function getDialogConfig() {
    return {
      title: 'Browse assets',
      size: 'large',
      body: {
        type: 'panel',
        items: [
          {
            type: 'input',
            name: 'assetSearch',
            placeholder: 'Search for an asset by title...',
          },
          {
            type: 'htmlpanel',
            html: `
                        <style>
                            #${vm.assetsContainerId} {
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-between;
                                max-height: 480px;
                                overflow-y: auto;
                                margin: 0 -9px;
                            }

                            #${vm.assetsContainerId} .cms-asset-item {
                                margin: 10px;
                            }
                            
                            #${vm.assetsContainerId} .cms-asset-image {
                                max-width: 200px;
                                background-color: red;
                            }

                            #${vm.assetsContainerId} .no-results {
                                margin-top: 100px;
                                font-weight: bold;
                            }
                        </style>
                        <div id="${vm.assetsContainerId}"></div>
                        `,
          },
        ],
      },
      buttons: [
        {
          type: 'custom',
          text: 'previous page',
          name: 'prev-pagination-btn',
          align: 'start',
        },
        {
          type: 'custom',
          text: 'next page',
          name: 'next-pagination-btn',
          align: 'end',
        },
      ],
      onAction: function (api, details) {
        if (details.name === 'prev-pagination-btn') {
          vm.parameters.page--;
        } else if (details.name === 'next-pagination-btn') {
          vm.parameters.page++;
        }
        changePage();
      },
      onChange: function (api, details) {
        const data = api.getData();
        // marketplace api doesn't support search at the moment, only filtering
        vm.parameters.filters.Title = data.assetSearch;
        vm.parameters.page = 1;
        debouncedChangePage();
      },
    };
  }
}
