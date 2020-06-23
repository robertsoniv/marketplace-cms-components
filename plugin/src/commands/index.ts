import AssetPicker from './AssetPicker/AssetPicker';
import AssetUploader from './AssetUploader/AssetUploader';

export default editor => {
  editor.addCommand('ocAssetPicker', AssetPicker);
  editor.addCommand('ocAssetUploader', AssetUploader);
};
