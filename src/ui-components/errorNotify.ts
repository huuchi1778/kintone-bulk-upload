import {Notification} from 'kintone-ui-component';
const newErrorNotify = new Notification({
  type: 'danger',
  className: '',
  duration: -1
});

export function errorNotify(error_message:string) {
  newErrorNotify.text = `Failed to upload file.\nError message: ${error_message}`;
  newErrorNotify.open();
}

