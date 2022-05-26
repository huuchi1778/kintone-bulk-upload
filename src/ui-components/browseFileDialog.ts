import {Dialog} from 'kintone-ui-component/lib/dialog';
import {Button} from 'kintone-ui-component';

// Create a new instance of Dialog
const newBrowseFilDialog = new Dialog();

// Create content
function createFileInput() {
  const inputEl = document.createElement('input');
  inputEl.type = 'file';
  inputEl.id = 'browse-file-input';
  return inputEl;
}

function createBodyContent() {
  const bodyContent = document.createElement('div');
  bodyContent.appendChild(createFileInput());
  return bodyContent;
}

function createFooterContent() {
  const footerContent = document.createElement('div');
  const cancelBtn = new Button({
    text: 'Cancel',
    type: 'normal'
  });
  const nextBtn = new Button({
    text: 'Next',
    type: 'submit'
  });
  footerContent.appendChild(cancelBtn);
  footerContent.appendChild(nextBtn);
  cancelBtn.addEventListener('click', () => {
    const cancelBtnClickEvent = new Event('kintone-bulk-upload:browse-file-dialog-cancel-click');
    document.dispatchEvent(cancelBtnClickEvent);
  });
  nextBtn.addEventListener('click', _ => {
    const nextBtnClickEvent = new Event('kintone-bulk-upload:browse-file-dialog-next-click');
    document.dispatchEvent(nextBtnClickEvent);
  });
  return footerContent;
}

export function browseFileDialog() {
  // Create dialog
  newBrowseFilDialog.title = 'Browse File';
  newBrowseFilDialog.content = createBodyContent();
  newBrowseFilDialog.footer = createFooterContent();
  document.addEventListener('kintone-bulk-upload:browse-file-dialog-cancel-click', _ => {
    newBrowseFilDialog.close();
  });
  document.addEventListener('kintone-bulk-upload:browse-file-dialog-next-click', _ => {
    newBrowseFilDialog.close();
  });

  // Add event listener
  newBrowseFilDialog.open();
}
