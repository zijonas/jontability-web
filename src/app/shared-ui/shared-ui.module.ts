import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


const materialModules = [
  BrowserAnimationsModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule
];

const uiModules = [
  CommonModule,
  CoreModule,
  RouterModule,
  FormsModule
]



@NgModule({
  declarations: [],
  imports: [
    ...uiModules
  ],
  exports: [
    ...materialModules
  ]
})
export class SharedUiModule { }
