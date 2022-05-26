// @ts-nocheck
import {FILE_UPLOAD_PATH, RECORD_UPDATE_PATH, ATTACHMENT_FIELDCODE} from './constant';
import {errorNotify} from './ui-components/errorNotify';

export function selectAll() {
  const selectAllCheckbox = document.getElementById('selectAll');
  const checkboxes = document.getElementsByName('selectCheckbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = selectAllCheckbox.checked;
  });
}

export function handleUpload(formFile:FormData) {
  const checkBoxes = document.getElementsByName('selectCheckbox'); //separate function 
  const selectedRecordsIdStr = [];
  Array.from(checkBoxes).forEach(checkbox => {
    if (checkbox.checked) {
      selectedRecordsIdStr.push(checkbox.value);
    }
  });
  // Convert array elements to number => we use this selectedRecordsId to upload
  const selectedRecordsId = selectedRecordsIdStr.map(el => {
    return parseInt(el, 10);
  });
  uploadFileToRecord(selectedRecordsId, formFile) //use update RECORDS api
    .then(myPromises => {
      return Promise.all(myPromises);
    })
    .then(_ => {
      const successEvent = new Event('kintone-bulk-upload:bulk-upload-success');
      document.dispatchEvent(successEvent);
    })
    .catch(error => {
      const errorEvent = new Event('kintone-bulk-upload:bulk-upload-error');
      document.dispatchEvent(errorEvent);
      errorNotify(error.message);
    });
}

function uploadFileToRecord(recordsId, formFile) {
  return new kintone.Promise((resolve, reject) => {
    const myPromises = [];
    recordsId.forEach(id => {
      uploadFile(formFile)
        .then(fileKey => {
          myPromises.push(attachFile(fileKey, ATTACHMENT_FIELDCODE, id));
          if (myPromises.length === recordsId.length) {
            resolve(myPromises);
          }
        });
    });
  });
}

export function getFile() {
  const inputFile = document.getElementById('browse-file-input');
  const formFile = new FormData();
  formFile.append('file', inputFile.files[0]);
  return formFile;
}

function uploadFile(formFile: FormData) {
  return new kintone.Promise((resolve, reject) => {
    const thisFormFile = formFile;
    thisFormFile.append('__REQUEST_TOKEN__', kintone.getRequestToken());
    const xhr = new XMLHttpRequest();
    xhr.open('POST', kintone.api.url(FILE_UPLOAD_PATH, true));
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (xhr.status > 300) {
        const errorEvent = new Event('kintone-bulk-upload:bulk-upload-error');
        document.dispatchEvent(errorEvent);
        errorNotify(xhr.status);
        reject();
      }
      resolve(xhr.response.fileKey);
    };
    xhr.send(thisFormFile);
  });
}

function attachFile(fileKey: string, FIELDCODE: string, recordId: number) {
  const requestBody = {
    'app': kintone.app.getId(),
    'id': recordId,
    'record': {
      [FIELDCODE]: {
        'value': [
          {
            'fileKey': fileKey
          }
        ]
      }
    }
  };
  return kintone.api(kintone.api.url(RECORD_UPDATE_PATH, true), 'PUT', requestBody);
}