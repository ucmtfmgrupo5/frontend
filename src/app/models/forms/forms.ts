import {FormlyFieldConfig} from '@ngx-formly/core';

export let COMMONFORM:FormlyFieldConfig[] = [
    {
      key: 'modelName',
      type: 'select',
      templateOptions: {
        label: 'Model',
        options: null,
        required: true,
      }
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Enter your name',
        required: true,
      }
    },
    {
      key: 'predictionName',
      type: 'input',
      templateOptions: {
        label: 'Prediction name',
        placeholder: 'Enter a name for this prediction',
        required: true,
      }
    }
  ];