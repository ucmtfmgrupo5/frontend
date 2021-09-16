export interface Prediction{
    input: any;
    modelName: string;
    predictionName: string;
    username: string;
}

export interface PredictionResult{
    date: any;
    id: string;
    modelName: string;
    predictionName: string;
    username: string;
    predictionsList: PredictionsList[];
}

export interface PredictionsList {
    input: any;
    prediction: any;
}