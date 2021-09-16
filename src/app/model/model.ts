import { FormlyFieldConfig } from "@ngx-formly/core";

export interface model{
    id: string;
    modelName: string;
    objectName: string;
    modelDescription: string;
    repositoryName: string;
    jsonSchema: any;
    dependencyList:any[];
}
