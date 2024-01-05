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
import { MatGridListModule } from '@angular/material/grid-list';

import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationParentComponent } from './presentational/navigation-parent.component';
import { CardEditorComponent } from './presentational/list-editor/card-editor.component';
import { CardListComponent } from './presentational/list-editor/card-list.component';
import { HeaderComponent } from './logical/header/header.component';
import { StatusPanel } from './presentational/header/status-panel';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LayoutModule } from '@angular/cdk/layout';


const materialModules = [
  LayoutModule,
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
  MatIconModule,
  MatGridListModule,
  MatListModule,
  MatPaginatorModule
];

const sharedComponents = [
  NavigationParentComponent,
  CardEditorComponent,
  CardListComponent,
  HeaderComponent,
  StatusPanel
]

const uiModules = [
  CommonModule,
  CoreModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    ...uiModules,
    ...materialModules
  ],
  exports: [
    ...materialModules,
    ...uiModules,
    ...sharedComponents
  ]
})
export class SharedUiModule { }
