declare const tinymce: any;
import 'jquery';
import 'slick-carousel';
import InsertCarousel from './components/InsertCarousel/InsertCarousel';
import InsertProduct from './components/InsertProduct/InsertProduct';
import InsertRow from './components/InsertRow/InsertRow';
import Commands from './commands/index';
import MarketplaceSdk from './config/MarketPlaceSdk.config';

tinymce.PluginManager.add('ordercloud', function(editor, url) {
  /**
   * TODO: I don't think this will be necessary once library is published
   * and we rely on shared instance but need for local development
   */
  InsertCarousel(editor, url);
  MarketplaceSdk(editor);
  InsertProduct(editor, url);
  InsertRow(editor, url);
  Commands(editor);
});
