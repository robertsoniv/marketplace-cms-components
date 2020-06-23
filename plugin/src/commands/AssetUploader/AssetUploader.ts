import { MarketplaceSDK } from 'marketplace-javascript-sdk';

export default function cmsUpload(
  ignorethisparam,
  { blobInfo, successCallback, errorCallback }
) {
  const filename = blobInfo.filename();
  MarketplaceSDK.Upload.UploadAsset({
    Active: true,
    File: blobInfo.blob(),
    Type: 'Image',
    FileName: blobInfo.filename(),
    Title: filename.split('.')[0],
  })
    .then(response => {
      successCallback(response.Url);
    })
    .catch(err => {
      console.log(err);
      errorCallback(e => {
        console.log(e);
        alert('There was an error uploading image');
      });
    });
}
