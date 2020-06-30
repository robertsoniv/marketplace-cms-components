export default (editor, url) => {
  editor.ui.registry.addIcon(
    'view-carousel',
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"/></svg>`
  );
  editor.ui.registry.addButton('oc-carousel', {
    icon: 'view-carousel',
    tooltip: 'Insert Carousel',
    onAction: function () {
      editor.settings.ordercloud.open_carousel_editor(editor);
    },
  });
};

// function openDialog(editor) {
//   const vm = {} as any;
//   vm.containerId = 'cms-carousel-editor-container';
//   vm.slidesId = 'cms-carousel-slides';
//   vm.images = [];

//   (function onInit() {
//     editor.windowManager.open(getDialogConfig());
//     renderPage();
//   })();

//   function renderPage() {
//     const $container = document.getElementById(vm.containerId);

//     $container.innerHTML = `<div id="carousel-editor-container">
//     <div class="d-flex flex-row">
//         <div class="slides-container">
//             <h5 class="text-muted">Drag to rearrange the order of your carousel slides</h5>
//             <div class="slides" id="cms-carousel-slides">
//                 <div class="slide">
//                     <span class="icon-add_circle"></span>
//                 </div>
//             </div>
//         </div>
//         <form name="slide-edit-form" class="slide-edit-form">
//             <h5 class="text-muted">Edit Slide 4</h5>
//             <div class="input-group">
//                 <label for="slide-h1">Slide H1</label>
//                 <input id="slide-h1" class="tox-textfield" type="text"></input>
//             </div>
//             <div class="input-group">
//                 <label for="slide-h2">Slide H2</label>
//                 <input id="slide-h2" class="tox-textfield" type="text"></input>
//             </div>
//             <div class="input-group">
//                 <label for="slide-actiontext">Action Text</label>
//                 <input id="slide-actiontext" class="tox-textfield" type="text"></input>
//             </div>
//             <div class="input-group">
//                 <label for="slide-actionurl">Action URL</label>
//                 <input id="slide-actionurl" class="tox-textfield" type="text"></input>
//             </div>
//         </form>
//     </div>
//     <div class="divider"></div>
//     <div class="settings">
//         <h5 class="text-muted">Carousel Settings</h5>
//         <form name="settings-form" class="settings-form d-flex flex-row">
//             <div class="settings-col">
//                 <div class="input-group">
//                     <label for="carousel-speed">Carousel Speed <span class="text-muted">(milliseconds)</span></label>
//                     <input id="carousel-speed" class="tox-textfield" type="number"></input>
//                 </div>
//                 <div class="input-group">
//                     <label for="carousel-slides-to-show">Slides to Show</label>
//                     <input id="carousel-slides-to-show" class="tox-textfield" type="number"></input>
//                 </div>
//                 <div class="input-group">
//                     <label for="carousel-slides-to-scroll">Slides to Scroll</label>
//                     <input id="carousel-slides-to-scroll" class="tox-textfield" type="number"></input>
//                 </div>
//                 <div class="input-group">
//                     <label for="carousel-rows">Rows</label>
//                     <input id="carousel-rows" class="tox-textfield" type="number"></input>
//                 </div>
//             </div>
//             <div class="settings-col">
//                 <label class="tox-checkbox" aria-disabled="false"><input type="checkbox" class="tox-checkbox__input"
//                         id="carousel-infinite-loop">
//                     <div class="tox-checkbox__icons"><span class="tox-icon tox-checkbox-icon__checked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm3.6 10.9L7 12.3a.7.7 0 00-1 1L9.6 17 18 8.6a.7.7 0 000-1 .7.7 0 00-1 0l-7.4 7.3z">
//                                 </path>
//                             </svg></span><span class="tox-icon tox-checkbox-icon__unchecked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm0 1a1 1 0 00-1 1v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H6z">
//                                 </path>
//                             </svg></span></div><span unselectable="on" class="tox-checkbox__label"
//                         for="carousel-infinite-loop" style="user-select: none;">Infinite Loop</span>
//                 </label>
//                 <label class="tox-checkbox" aria-disabled="false"><input type="checkbox" class="tox-checkbox__input"
//                         id="carousel-show-dots">
//                     <div class="tox-checkbox__icons"><span class="tox-icon tox-checkbox-icon__checked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm3.6 10.9L7 12.3a.7.7 0 00-1 1L9.6 17 18 8.6a.7.7 0 000-1 .7.7 0 00-1 0l-7.4 7.3z">
//                                 </path>
//                             </svg></span><span class="tox-icon tox-checkbox-icon__unchecked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm0 1a1 1 0 00-1 1v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H6z">
//                                 </path>
//                             </svg></span></div><span unselectable="on" class="tox-checkbox__label"
//                         for="carousel-show-dots" style="user-select: none;">Show Dots</span>
//                 </label>
//                 <label class="tox-checkbox" aria-disabled="false"><input type="checkbox" class="tox-checkbox__input"
//                         id="carousel-show-arrows">
//                     <div class="tox-checkbox__icons"><span class="tox-icon tox-checkbox-icon__checked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm3.6 10.9L7 12.3a.7.7 0 00-1 1L9.6 17 18 8.6a.7.7 0 000-1 .7.7 0 00-1 0l-7.4 7.3z">
//                                 </path>
//                             </svg></span><span class="tox-icon tox-checkbox-icon__unchecked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm0 1a1 1 0 00-1 1v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H6z">
//                                 </path>
//                             </svg></span></div><span unselectable="on" class="tox-checkbox__label"
//                         for="carousel-show-arrows" style="user-select: none;">Show Arrows</span>
//                 </label>
//                 <label class="tox-checkbox" aria-disabled="false"><input type="checkbox" class="tox-checkbox__input"
//                         id="carousel-center-mode">
//                     <div class="tox-checkbox__icons"><span class="tox-icon tox-checkbox-icon__checked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm3.6 10.9L7 12.3a.7.7 0 00-1 1L9.6 17 18 8.6a.7.7 0 000-1 .7.7 0 00-1 0l-7.4 7.3z">
//                                 </path>
//                             </svg></span><span class="tox-icon tox-checkbox-icon__unchecked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm0 1a1 1 0 00-1 1v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H6z">
//                                 </path>
//                             </svg></span></div><span unselectable="on" class="tox-checkbox__label"
//                         for="carousel-center-mode" style="user-select: none;">Center Mode</span>
//                 </label>
//                 <label class="tox-checkbox" aria-disabled="false"><input type="checkbox" class="tox-checkbox__input"
//                         id="carousel-fade-transition">
//                     <div class="tox-checkbox__icons"><span class="tox-icon tox-checkbox-icon__checked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm3.6 10.9L7 12.3a.7.7 0 00-1 1L9.6 17 18 8.6a.7.7 0 000-1 .7.7 0 00-1 0l-7.4 7.3z">
//                                 </path>
//                             </svg></span><span class="tox-icon tox-checkbox-icon__unchecked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm0 1a1 1 0 00-1 1v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H6z">
//                                 </path>
//                             </svg></span></div><span unselectable="on" class="tox-checkbox__label"
//                         for="carousel-fade-transition" style="user-select: none;">Fade Transition</span>
//                 </label>
//                 <label class="tox-checkbox" aria-disabled="false"><input type="checkbox" class="tox-checkbox__input"
//                         id="carousel-autoplay">
//                     <div class="tox-checkbox__icons"><span class="tox-icon tox-checkbox-icon__checked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm3.6 10.9L7 12.3a.7.7 0 00-1 1L9.6 17 18 8.6a.7.7 0 000-1 .7.7 0 00-1 0l-7.4 7.3z">
//                                 </path>
//                             </svg></span><span class="tox-icon tox-checkbox-icon__unchecked"><svg width="24"
//                                 height="24">
//                                 <path fill-rule="nonzero"
//                                     d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm0 1a1 1 0 00-1 1v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H6z">
//                                 </path>
//                             </svg></span></div><span unselectable="on" class="tox-checkbox__label"
//                         for="carousel-autoplay" style="user-select: none;">Autoplay</span>
//                 </label>
//             </div>
//         </form>
//     </div>
// </div>`
//     const $addSlide = $container.getElementsByClassName('slide')[0];
//     $addSlide.addEventListener('click', addSlide);

//     if (vm.images.length) {
//       const $slides = document.getElementById(vm.slidesId);
//       vm.images.forEach((image, index) => {
//         $slides.insertAdjacentHTML(
//           'beforeend',
//           `<div class="slide"><img src="${image}" data-listorder="${index}"></img></div>`
//         );
//       });
//     }
//   }

//   function addSlide() {
//     console.log('add a slide');
//     editor.windowManager.open(getAddSlideConfig());
//     // renderSlide();
//   }

//   function getDialogConfig() {
//     return {
//       title: '',
//       size: 'large',
//       body: {
//         type: 'panel',
//         items: [
//           {
//             type: 'htmlpanel',
//             html: `<div id="${vm.containerId}"></div>`,
//           },
//         ],
//       },
//       buttons: [
//         {
//           primary: true,
//           type: 'submit',
//           text: 'save changes',
//           align: 'end',
//         },
//       ],
//       onAction: function (api, details) {
//         // if (details.name === 'add-item') {
//         //   // addItem();
//         // } else if (details.name === 'remove-item') {
//         //   // removeItem();
//         // } else if (details.name === 'edit-options') {
//         //   // editOptions();
//         // }
//       },
//       onChange: function (api, details) {
//         // const data = api.getData();
//         // // marketplace api doesn't support search at the moment, only filtering
//         // vm.parameters.filters.Title = data.assetSearch;
//         // vm.parameters.page = 1;
//         // debouncedChangePage();
//       },
//     };
//   }

//   function getAddSlideConfig() {
//     return {
//       title: 'Choose type of slide to create',
//       size: 'normal',
//       body: {
//         type: 'panel',
//         items: [],
//       },
//       buttons: [
//         {
//           type: 'custom',
//           text: 'Product Slide',
//           align: 'start',
//         },
//         {
//           type: 'submit',
//           text: 'Image Slide',
//           primary: true,
//           align: 'end',
//         },
//       ],
//       onAction: function (dialogApi, details) {
//         console.log('onAction');
//       },
//       onSubmit: function (dialogApi, details) {
//         addImage(dialogApi);
//         console.log('onChange');
//       },
//     };

//     function addProduct() {}

//     function addImage(dialogApi) {
//       // importing tinymce breaks things so we have to use instance from window
//       window['tinymce'].execCommand('ocAssetPicker', true, {
//         callback: onSelectImage(dialogApi),
//         value: null,
//         meta: { filetype: 'image' },
//       });
//     }

//     function onSelectImage(dialogApi) {
//       return function (imageUrl) {
//         vm.images.push(imageUrl);
//         renderPage();
//         dialogApi.close();
//       };
//     }
//   }
// }
