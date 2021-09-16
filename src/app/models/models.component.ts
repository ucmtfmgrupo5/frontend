import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { model } from 'app/model/model';
import { ModelService } from 'app/services/model.service';

declare var $: any;

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  constructor(private modelService: ModelService, public dialog: MatDialog, private formBuilder: FormBuilder) { }


  models: model[] = null;
  modelSelected: model = null;
  model: any = {};
  fields: FormlyFieldConfig[];
  panelOpenState = false;

  get dependencyList(){
    return this.modelForm.get('dependencyList') as FormArray;
  }

  addDependency(){
    const dependencyFormGroup = this.formBuilder.group({
      name: ['',Validators.required]
    })

    this.dependencyList.push(dependencyFormGroup)
  }

  removeDependency(index: number){
    this.dependencyList.removeAt(index);
  }

  refresh(){
    console.log(this.modelForm)
    this.modelForm.patchValue({
    modelName: null,
    modelDescription: null,
    objectName: null,
    repositoryName: null,
    jsonSchema: null,
    })
    this.dependencyList.controls.splice(0, this.dependencyList.length)

  }

  submit(){
    this.modelService.insertModel(this.modelForm)
    .subscribe({
      next: data => {
        this.showNotification('bottom','right','The <b>model</b> was succesfully created.', 'info')
        this.refresh();
        this.getModels();
      },
      error: error => {
          console.error('There was an error!', error);
          this.showNotification('bottom','right','There was an error creating the model.', 'danger')
      }
  }

    );
  }

  modelForm = this.formBuilder.group({
    modelName: [null,Validators.required],
    modelDescription: [null,Validators.required],
    objectName: [null,Validators.required],
    repositoryName: [null,Validators.required],
    jsonSchema: [null, Validators.required],
    dependencyList: this.formBuilder.array([])
  })
  
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.modelForm.get('jsonSchema').setValue(file);
    }
  }


  ngOnInit() {
      this.getModels();

    
  }

  getModels(){
    this.modelService.getModels()
    .subscribe((data: model[]) => {
      this.models = data;

    }
    );
  }

  deleteModel(model: model) {


    this.modelService.deleteModel(model.id)
    .subscribe((data: any) => {

    
      this.showNotification('bottom','right','The <b>model</b> was succesfully deleted.', 'info')
      this.getModels();
    }
    );
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(JsonSchemaDialog , {
      data: {
        schema: this.modelSelected.jsonSchema
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  schemaClick(modelName: string){
    this.modelService.getModel(modelName)
    .subscribe((data: model) => {
      this.modelSelected = data;
      this.openDialog();
    }
    );
  }

  showNotification(from, align, body, TYPE) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: body

    }, {
      type: TYPE,
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
@Component({
  selector: 'json-schema-dialog',
  templateUrl: 'json-schema-dialog.html',
})
export class JsonSchemaDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

