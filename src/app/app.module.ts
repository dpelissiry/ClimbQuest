import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LeafletMarkerClusterModule } from '@bluehalo/ngx-leaflet-markercluster';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ButtonDirective,
          CardBodyComponent,
          CardComponent,
          CollapseDirective,
          TextColorDirective,
        CollapseModule} from '@coreui/angular';
// import { InfiniteScrollModule } from "ngx-infinite-scroll";


import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import { ResultBlockComponent } from './result-block/result-block.component';
import { ErrorBlockComponent } from './error-block/error-block.component';
import { FooterComponent } from './footer/footer.component';
import { PopularSearchComponent } from './popular-search/popular-search.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PopularSearchBlockComponent } from './popular-search-block/popular-search-block.component';
import { SearchService } from './search.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms';
import { NgxLeafletFullscreenModule } from '@runette/ngx-leaflet-fullscreen';
import { SanitizerPipe } from './sanitizer.pipe';
import { SafePipe } from 'safe-pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SmallSearchComponent } from './small-search/small-search.component';
import { BoundingBoxComponent } from './bounding-box/bounding-box.component';
import { SmallResultBlockComponent } from './small-result-block/small-result-block.component';
import { TrainingComponent } from './training/training.component';

@NgModule({ declarations: [
        AppComponent,
        ResultComponent,
        ResultBlockComponent,
        ErrorBlockComponent,
        FooterComponent,
        PopularSearchComponent,
        ResultPageComponent,
        HomePageComponent,
        PopularSearchBlockComponent,
        MapComponent,
        SanitizerPipe,
        SmallSearchComponent,
        BoundingBoxComponent,
        SmallResultBlockComponent,
        TrainingComponent,
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
                AppRoutingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAnalyticsModule,
                FormsModule,
                LeafletMarkerClusterModule,
                NgxLeafletFullscreenModule,
                MatButtonToggleModule,
                MatButtonModule,
                MatInputModule,
                MatFormFieldModule,
                ButtonDirective,
                CardBodyComponent,
                CardComponent,
                CollapseDirective,
                TextColorDirective,
                CollapseModule],
    providers: [SearchService, provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()] })

export class AppModule { }
