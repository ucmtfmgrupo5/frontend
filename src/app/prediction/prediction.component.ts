import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { model } from 'app/model/model';
import { Prediction, PredictionResult } from 'app/model/prediction';
import { ModelService } from 'app/services/model.service';
import { COMMONFORM } from './forms/forms';
declare var $: any;

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {

  constructor(private modelService: ModelService) { }

  modelCombo: any = [];

  formReady: boolean = false;
  inputModelReady: boolean = false;
  predictionArrived: boolean = false;
  IsWait: boolean = false;
  showButton: boolean = false;

  form = new FormGroup({});
  model: Prediction = { modelName: null, input: null, predictionName: null, username: null };
  predictionHeader: FormlyFieldConfig[];
  predictionInput: FormlyFieldConfig[];
  predictionResult: PredictionResult = null;


  ngOnInit() {
    this.modelService.getModels()
      .subscribe((data: model[]) => {
        for (let x = 0; x < data.length; x++) {
          this.modelCombo[x] = { label: "", value: "" };
          this.modelCombo[x].label = data[x].modelName
          this.modelCombo[x].value = data[x].modelName
        }
        this.predictionHeader = COMMONFORM
        this.predictionHeader[0].templateOptions.options = this.modelCombo
        this.model.modelName = this.modelCombo[0].value
        this.formReady = true;
      }
      );
  }

  onNext() {
    this.modelService.getModel(this.model.modelName)
      .subscribe((data: model) => {
        console.log('MODEL INPUT ->',data)
        this.predictionInput = data.jsonSchema;
        this.inputModelReady = true;
        this.showButton = true;
      }
      );
  }

  onSubmit() {
    this.IsWait = true;
    this.predictionArrived = false;
    this.modelService.predict(this.model)
      .subscribe((data: PredictionResult) => {
        this.predictionResult = data;
        this.predictionArrived = true;
        this.IsWait = false;
        this.showNotification('bottom', 'right')
      }
      );

      this.showButton = false
      this.model.input = null
 
  }

  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: "Your <b>prediction</b> was succesfully stored."

    }, {
      type: 'info',
      timer: 200,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}


