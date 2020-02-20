import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent, PromoteDialogComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    DragDropModule,
    HttpClientModule,
    CdkTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  declarations: [
    AppComponent, PromoteDialogComponent
  ],
  entryComponents: [PromoteDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
