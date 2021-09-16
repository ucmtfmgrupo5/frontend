import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { model } from 'app/model/model';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ModelService {
  constructor(private http: HttpClient) { }

  insertModelUrl = 'http://localhost:8080/controller/insertModel';
  deleteModelUrl = 'http://localhost:8080/controller/deleteModel';
  getModelsUrl = 'http://localhost:8080/controller/getModels';
  getModelUrl = 'http://localhost:8080/controller/getModel';
  predictUrl = 'http://localhost:8080/controller/predict';
  getPredictionsUrl = 'http://localhost:8080/controller/getPredictions';

  getModels() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })

    return this.http.get<model[]>(this.getModelsUrl, { headers });
  }

  getModel(modelName: string) {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })

    const params = new HttpParams()
      .set('name', modelName);

    return this.http.get<model>(this.getModelUrl, { headers, params });
  }

  getPredictions(modelName: string) {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })

    const params = new HttpParams()
      .set('model', modelName);

    return this.http.get<any>(this.getPredictionsUrl, { headers, params });
  }

  predict(body: any) {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })

    return this.http.post<any>(this.predictUrl, body, { headers });
  }

  insertModel(body: FormGroup) {
    const formData = new FormData();
    formData.append('modelName', body.get('modelName').value);
    formData.append('file', body.get('jsonSchema').value);
    formData.append('objectName', body.get('objectName').value);
    formData.append('repositoryName', body.get('repositoryName').value);
    formData.append('modelDescription', body.get('modelDescription').value);

    if (body.get('dependencyList').value !== []) {
      for (const index in body.get('dependencyList').value) {
        formData.append(`dependencyList[${index}].name`, body.get('dependencyList').value[index].name.toString());
      }
    }
    return this.http.post<any>(this.insertModelUrl, formData);
  }

  deleteModel(id: string) {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })

    const params = new HttpParams()
      .set('id', id);

    return this.http.delete<any>(this.deleteModelUrl, { headers, params });  }




}