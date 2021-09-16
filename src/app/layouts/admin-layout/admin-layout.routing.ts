import { Routes } from '@angular/router';

import { PredictionComponent } from 'app/prediction/prediction.component';
import { ModelsComponent } from 'app/models/models.component';
import { MyPredictionsComponent } from 'app/my-predictions/my-predictions.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'prediction',     component: PredictionComponent },
    { path: 'models',         component: ModelsComponent },
    { path: 'my-predictions', component: MyPredictionsComponent }
];
