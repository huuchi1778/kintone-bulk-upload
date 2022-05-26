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
  const selectedRecordsId = getIdFromForm('selectCheckbox');
  const numRecords = selectedRecordsId.length;

  uploadFile(numRecords, formFile)
    .then(fileKeyList => {

    });

}

function getIdFromForm(elName: string) {
  const checkBoxes = document.getElementsByName(elName);
  const selectedRecordsIdStr = [];
  Array.from(checkBoxes).forEach(checkbox => {
    if (checkbox.checked) {
      selectedRecordsIdStr.push(checkbox.value);
    }
  });
  // Convert array elements to number
  const selectedRecordsId = selectedRecordsIdStr.map(el => {
    return parseInt(el, 10);
  });
  return selectedRecordsId;
}

function prepareRequest(numRecords:number, fileKeyList:any[string], selectedRecordsId) {
  const requestBody = {
    'app': kintone.app.getId(),
    'records': []
  };
  fileKeyList.forEach(fileKey => {
    requestBody.records.push();
  })

}

function uploadFile(numRecords:number, formFile:FormData) {
  const fileKeyList = [];
  return new kintone.Promise((resolve, reject) => {
    const thisFormFile = formFile;
    for (let i = 0; i < numRecords; i++) {
      thisFormFile.append('__REQUEST_TOKEN__', kintone.getRequestToken());
      const xhr = new XMLHttpRequest();
      xhr.open('POST', kintone.api.url(FILE_UPLOAD_PATH, true));
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.responseType = 'json';
      xhr.onload = function() {
        if (xhr.status > 300) {
          reject(xhr.status);
        }
        fileKeyList.push(xhr.response.fileKey);
      };
      xhr.send(thisFormFile);

      if (fileKeyList.length === numRecords) {
        resolve(fileKeyList);
      }
    }
  });
}

export function getFile() {
  const inputFile = document.getElementById('browse-file-input');
  const formFile = new FormData();
  formFile.append('file', inputFile.files[0]);
  return formFile;
}

