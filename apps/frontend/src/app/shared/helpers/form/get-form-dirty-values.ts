import { FormGroup, AbstractControl } from '@angular/forms';

export function getDirtyValues(form: FormGroup) {
  const dirtyValues: { [key: string]: any } = {};
  Object.keys(form.controls)
    .forEach(key => {
      const currentControl = form.controls[key];
      if (currentControl.dirty
        && currentControl.enabled) {
          if (currentControl instanceof AbstractControl) {
            dirtyValues[key] = currentControl.value;
          } else {
            dirtyValues[key] = getDirtyValues(currentControl);
          }
      }
    });
  return dirtyValues;
}
