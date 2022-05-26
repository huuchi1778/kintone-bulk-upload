import {Notification} from 'kintone-ui-component';
const newSuccessNotify = new Notification({
  text: 'File uploaded successfully.',
  type: 'success',
  className: '',
  duration: 1500
});

export function successNotify() {
  newSuccessNotify.open();
}

