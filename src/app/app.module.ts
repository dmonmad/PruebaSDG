import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwPaginationModule } from 'jw-angular-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgxSliderModule } from '@angular-slider/ngx-slider'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpinnerComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    SelectDropDownModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
