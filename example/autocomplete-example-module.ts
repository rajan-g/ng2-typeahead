import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { TypeHeadModule } from '../src/typehead.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, TypeHeadModule ],
  declarations: [AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AutoCompleteExampleModule { }