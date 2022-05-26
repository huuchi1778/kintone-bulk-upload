// @ts-nocheck
import {Dialog} from 'kintone-ui-component/lib/dialog';
import {Button} from 'kintone-ui-component';
import {selectAll} from '../common';
import {CANCEL_BUTTON_TEXT, UPLOAD_BUTTON_TEXT} from '../constant';


// Create a new instance of Dialog
const newSelectRecordsDialog = new Dialog();

// Create content
function createBodyContent(records) {
  let tableContent = '';
  records.forEach(record => {
    tableContent += `
      <tr>
        <td><input type="checkbox" name="selectCheckbox" value="${record.$id.value}"></td>
        <td>${record.Record_number.value}</td>
        <td>${record.firstName.value}</td>
        <td>${record.lastName.value}</td>
      </tr>
    `;
  });
  const userTable = `
    <form id="select-users-form">
      <table>
        <tr>
          <th> <input type="checkbox" id="selectAll" /> </th>
          <th> Record Number </th>
          <th> First Name </th>
          <th> Last Name </th>
        </tr>
        ${tableContent}
      </table>
    </form>
  `;
  const bodyStyle = `
    <style>
      table, th, td {
        border: 1px solid gray;
        border-collapse: collapse;
        padding:10px;
      }
      #user-table-div{
        max-height: 400px;
        max-width: 650px;
        overflow-y: scroll;
      }
    </style>
  `;
  const bodyContent = `
    ${bodyStyle}
    <div id='user-table-div'>
      ${userTable}
    </div>`;
  return bodyContent;
}

function createFooterContent() {
  const footerContent = document.createElement('div');
  const cancelBtn = new Button({
    text: CANCEL_BUTTON_TEXT,
    type: 'normal'
  });
  const uploadBtn = new Button({
    text: UPLOAD_BUTTON_TEXT,
    type: 'submit'
  });
  footerContent.appendChild(cancelBtn);
  footerContent.appendChild(uploadBtn);
  cancelBtn.addEventListener('click', () => {
    const cancelBtnClickEvent = new Event('kintone-bulk-upload:select-records-dialog-cancel-click');
    document.dispatchEvent(cancelBtnClickEvent);
  });
  uploadBtn.addEventListener('click', _ => {
    const uploadBtnClickEvent = new Event('kintone-bulk-upload:select-records-dialog-upload-click');
    document.dispatchEvent(uploadBtnClickEvent);
  });
  return footerContent;
}

export function selectRecordsDialog(records:object) {
  // Create dialog
  newSelectRecordsDialog.title = 'Select Records';
  newSelectRecordsDialog.content = createBodyContent(records);
  newSelectRecordsDialog.footer = createFooterContent();
  document.addEventListener('kintone-bulk-upload:select-records-dialog-cancel-click', _ => {
    newSelectRecordsDialog.close();
  });
  document.addEventListener('kintone-bulk-upload:select-records-dialog-upload-click', _ => {
    newSelectRecordsDialog.close();
  });
  newSelectRecordsDialog.open();
  document.getElementById('selectAll').addEventListener('click', selectAll);
}

