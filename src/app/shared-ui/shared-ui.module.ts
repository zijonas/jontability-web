import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox'
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button'
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
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
