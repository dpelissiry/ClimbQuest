import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponenents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { HeaderComponent } from './header/header.component';
import { ResultBlockComponent } from './result-block/result-block.component';
import { ErrorBlockComponent } from './error-block/error-block.component';
import { FooterComponent } from './footer/footer.component';
import { SortComponent } from './sort/sort.component';
import { PopularSearchComponent } from './popular-search/popular-search.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SmallHeaderComponent } from './small-header/small-header.component';
import { PopularSearchBlockComponent } from './popular-search-block/popular-search-block.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent,
    HeaderComponent,
    ResultBlockComponent,
    ErrorBlockComponent,
    FooterComponent,
    SortComponent,
    PopularSearchComponent,
    ResultPageComponent,
    HomePageComponent,
    SmallHeaderComponent,
    PopularSearchBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
