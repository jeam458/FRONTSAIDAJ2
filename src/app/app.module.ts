import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconModule } from '@visurel/iconify-angular';
import { NewworkComponent } from './newwork/newwork.component';
import { WorksComponent } from './works/works.component';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { InterceptorService} from './services/interceptor.service';
import { CreateTareaComponent } from './create-tarea/create-tarea.component';
import { TareasComponent } from './tareas/tareas.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { AsignartareaComponent } from './asignartarea/asignartarea.component';
import { ListadoTareasComponent } from './listado-tareas/listado-tareas.component';
import { IngresomultipleComponent } from './ingresomultiple/ingresomultiple.component';
import { MatChipsModule} from '@angular/material/chips';
import { MatStepperModule} from '@angular/material/stepper';
import { FileUploadModule } from 'ng2-file-upload';

import { TipoparteComponent} from './tipoparte/tipoparte.component';
import { ListTipoparteComponent} from './list-tipoparte/list-tipoparte.component';
import { ParteComponent} from './parte/parte.component';
import { ListparteComponent} from './listparte/listparte.component';
import { ActoprocesalComponent} from './actoprocesal/actoprocesal.component';
import { ListActoprocesalComponent} from './list-actoprocesal/list-actoprocesal.component';
import { DependenciaComponent} from './dependencia/dependencia.component';
import { ListDependenciaComponent} from './list-dependencia/list-dependencia.component';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { LegajoComponent} from './legajo/legajo.component';

@NgModule({
  declarations: [
    AppComponent, 
    SignupComponent, 
    LoginComponent, 
    ProfileComponent, 
    DashboardComponent, 
    NewworkComponent, 
    WorksComponent, 
    CreateTareaComponent, 
    TareasComponent, 
    DialogComponent, 
    AsignartareaComponent, 
    ListadoTareasComponent, 
    IngresomultipleComponent,
    TipoparteComponent,
    ListTipoparteComponent,
    ParteComponent,
    ListparteComponent,
    ActoprocesalComponent,
    ListActoprocesalComponent,
    DependenciaComponent,
    ListDependenciaComponent,
    ExpedientesComponent,
    LegajoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    IconModule,
    FormsModule,
    MatChipsModule,
    MatStepperModule,
    FileUploadModule,
    // Vex
    VexModule,
    CustomLayoutModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
