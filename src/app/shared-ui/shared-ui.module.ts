import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NavigationParentComponent } from './presentational/navigation-parent.component';


const materialModules = [
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

const sharedComponents = [
  NavigationParentComponent
]

const uiModules = [
  CommonModule,
  CoreModule,
  RouterModule,
  FormsModule
]



@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    ...uiModules
  ],
  exports: [
    ...materialModules,
    ...uiModules,
    ...sharedComponents
  ]
})
export class SharedUiModule { }
