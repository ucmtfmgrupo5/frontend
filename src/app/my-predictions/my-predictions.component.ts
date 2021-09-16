
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { model } from 'app/model/model';
import { ModelService } from 'app/services/model.service';

declare var $: any;

@Component({
  selector: 'app-my-predictions',
  templateUrl: './my-predictions.component.html',
  styleUrls: ['./my-predictions.component.css']
})
export class MyPredictionsComponent implements OnInit {

  constructor(private modelService: ModelService, public dialog: MatDialog) { }

  formReady = false;
  tableReady = false;
  modelCombo: any = [];
  selected = null;
  predictions: any[] = null;


  ngOnInit() {
    this.modelService.getModels()
      .subscribe((data: model[]) => {
        for (let x = 0; x < data.length; x++) {
          this.modelCombo[x] = { value: "", viewValue: "" };
          this.modelCombo[x].value = data[x].modelName
          this.modelCombo[x].viewValue = data[x].modelName
        }
          this.formReady=true;
      }
      );
  }

  search() {
    this.tableReady=false;
   if(this.selected!=null){
    this.modelService.getPredictions(this.selected)
    .subscribe((data: any) => {
      this.predictions = data;
      console.log(this.predictions)
      this.tableReady = true;
    }
    );
   }
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

  openDialog(inputs:any) {
    inputs = Object.entries(inputs).map(([key, value]) => ({key,value}));
    console.log('INPUTS',inputs)
    const dialogRef = this.dialog.open(InputDialog , {
      data: {
        input: inputs
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'input-dialog',
  templateUrl: 'input-dialog.html',
})
export class InputDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  
  

}


