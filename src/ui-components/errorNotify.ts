import {Notification} from 'kintone-ui-component';
const newErrorNotify = new Notification({
  type: 'danger',
  className: '',
  duration: 5000
});

export function errorNotify(error_message) {
  newErrorNotify.text = `Failed to upload file.\nError message: ${error_message}`;
  newErrorNotify.open();
}

