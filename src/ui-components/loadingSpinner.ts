import {Spinner} from 'kintone-ui-component';

const newLoadingSpinner = new Spinner({
  text: 'Uploading...'
});

export function loadingSpinner() {
  document.addEventListener('kintone-bulk-upload:select-records-dialog-upload-click', _ => {
    newLoadingSpinner.open();
    // console.log('hi from spinner');
  });
  document.addEventListener('kintone-bulk-upload:bulk-upload-success', _ => {
    newLoadingSpinner.close();
  });
  document.addEventListener('kintone-bulk-upload:bulk-upload-error', _ => {
    newLoadingSpinner.close();
  });
}