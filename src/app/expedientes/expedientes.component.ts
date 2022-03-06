import { ChangeDetectionStrategy, Component, OnInit, OnChanges, ViewChild} from '@angular/core';
import { ExpedienteService } from '../services/expediente.service';
import { ExpedienteSchema } from '../services/models/expediente';
import { DependenciaService } from '../services/dependencia.service';
import { DependenciaSchema } from '../services/models/dependencia';
import { ParteService } from '../services/parte.service';
import { ParteSchema } from '../services/models/parte';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { AuthService} from '../services/auth.service';
import icVerticalSplit from '@iconify/icons-ic/twotone-vertical-split';
import icVisiblity from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icDescription from '@iconify/icons-ic/twotone-description';
import fiber_new from '@iconify/icons-ic/fiber-new';
import plus_one from '@iconify/icons-ic/plus-one';
import { stagger80ms } from '../../@vex/animations/stagger.animation';
import { scaleIn400ms } from '../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../@vex/animations/fade-in-right.animation';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'vex-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger80ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class ExpedientesComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ParteSchema>;
  displayedColums:string[]=[
    'Documento','Nombre','Ap','Am','Eliminar'
  ]

  expediente: ExpedienteSchema;
  deps: DependenciaSchema[]=[];
  parte:ParteSchema;
  partes:ParteSchema[]=[]; 
  form:FormGroup;
  parteform:FormGroup;

 
  Organos=[
    {id:'1', name:'SALA SUPREMA'},
    {id:'2', name:'SALA SUPERIOR'},
    {id:'3', name:'JUZGADO ESPECIALIZADO'},
    {id:'4', name:'JUZGADO MIXTO'},
    {id:'5', name:'JUZGADO DE PAZ LETRADO'},
    {id:'6', name:'JUZGADOD DE PAZ NO LETRADO'},
  ]
  Especialidades=[
    {id:'CA',name:'CONTENCIOSO ADMINSTRATIVO'},
    {id:'CI',name:'CIVIL'},
    {id:'CO',name:'COMERCIAL'},
    {id:'DC',name:'DERECHO CONSTITUCIONAL'},
    {id:'ED',name:'EXTINCION DE DOMINIO'},
    {id:'FA',name:'FAMILIA'},
    {id:'FC',name:'FAMILIA CIVIL'},
    {id:'FP',name:'FAMILIA PENAL'},
    {id:'FT',name:'FAMILIA TUTELAR'},
    {id:'LA',name:'LABORAL'},
    {id:'PE',name:'PENAL'},
  ]

  Motivos = [
    {id:'1',name:'APELACION DE AUTO - INCIDENTE'},
    {id:'2',name:'APELACION DE AUTO - PRINCIPAL'},
    {id:'3',name:'APELACION DE SENTENCIA'},
    {id:'4',name:'CONSULTA / REVISIÓN'},
    {id:'5',name:'CONTIENDA DE COMPETENCIA'},
    {id:'6',name:'DEMANDA'},
    {id:'7',name:'DENUNCIA'},
    {id:'8',name:'DESARCHIVAMIENTO'},
    {id:'9',name:'DEVOLUCION DE INSTANCIA SUPERIOR'},
    {id:'10',name:'EXHORTO'},
    {id:'11',name:'INHIBICIÓN'}
  ]

  tiposDocumento=[
    {id:'DNI'},
    {id:'PASAPORTE'},
    {id:'CARNET EXTRANJERIA'}
  ]

  forminicio={
     Expediente:'',
     NroExpediente:'',
     AnioExpediente:'',
     juzgado:'',
     Materia:'',
   } 

   forminicioParte={
    Nombre:'',
    ApellidoM:'',
    ApellidoP:'',
    Documento:'',
    TipoDocumento:'', 
   } 

  icDoneAll = icDoneAll;
  icDescription = icDescription;
  icVerticalSplit = icVerticalSplit;
  icVisibility = icVisiblity;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  icNew= fiber_new;
  oneNew= plus_one;
  constructor(
    private snackbar: MatSnackBar, 
    private expService:ExpedienteService,
    private depservice:DependenciaService,
    private parteservice:ParteService,
    private fb: FormBuilder, 
    private userdatos:AuthService
  ) { }

  ngOnInit(): void {
    this.expediente = this.inicializarExpediente();
    this.parte = this.inicializarParte();
    this.inicializarform();
    this.inicializarform1();
    this.getDependenciasTipo();
    this.OnChanges();
  }

  inicializarExpediente(){
    var exp: ExpedienteSchema;
    exp={
      _id:'',
      Expediente:'',
      Juzgado:'',
      NroExpediente:0,
      AnioExpediente:0,
      Motivo:'',
      Materia:'',
      Partes: [],
      UCreador:this.userdatos.mostrarDatos()._id,
      fecha:new Date()
    }
    return exp;
  }

  inicializarform(){
    this.form=this.fb.group({
      Expediente:['', Validators.required],
      Juzgado:['',Validators.required],
      NroExpediente:['',Validators.required],
      AnioExpediente:['',Validators.required],
      Materia:['',Validators.required],
      Motivo:['']
    })

      this.partes=[];
      this.partes= this.expediente.Partes;
      this.dataSource= new MatTableDataSource(this.partes);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator= this.paginator;
  }

  inicializarform1(){
    this.parteform=this.fb.group({
      Nombre:['',Validators.required],
      ApellidoM:[''],
      ApellidoP:['',Validators.required],
      Documento:['',Validators.required],
      TipoDocumento:['',Validators.required],
    })
  }

  inicializarParte(){
    var parte: ParteSchema;
    parte={
      _id:'',
      Nombre:'',
      ApellidoM:'',
      ApellidoP:'',
      Documento:'',
      TipoDocumento:'',
      Autor:this.userdatos.mostrarDatos()._id,
      fecha:new Date()
    }
    return parte;
  }

  OnChanges(){
    this.parteform.get('Documento').valueChanges.subscribe(res =>{
      if(res !== null && res !== undefined){
        if(res.toString().length === 8){
          console.log(res);
          this.parteservice.getdni(res.toString()).subscribe(data=> {
            console.log(data);
            this.parteform.patchValue({'Nombre':data.name})
            this.parteform.patchValue({'ApellidoP':data.paternal_surname})
            this.parteform.patchValue({'ApellidoM':data.maternal_surname})
          })  
        }
      }
      
    })
  }


  cancelar(){
    this.form.reset();
  }
  cancelar1(){
    this.parteform.reset();
  }

  guardarParte(){
    delete this.parte._id;
    this.parte.TipoDocumento = this.parteform.get('TipoDocumento').value;
    this.parte.Documento = this.parteform.get('Documento').value;
    this.parte.ApellidoP = this.parteform.get('ApellidoP').value;
    this.parte.ApellidoM = this.parteform.get('ApellidoM').value;
    this.parte.Nombre = this.parteform.get('Nombre').value;
    this.parteservice.postParte(this.parte).subscribe(res=>{
      if(res){
        
        this.partes.push(res as  ParteSchema);
        this.dataSource = new MatTableDataSource(this.partes);
        this.parteform.reset(this.forminicio);
        this.snackbar.open('bien hecho!', 'Parte registrada', {
          duration: 10000
        });
      }
    })
  }


  guardar(){
    delete this.expediente._id;
    this.expediente.Expediente = this.form.get('Expediente').value;
    this.expediente.NroExpediente = this.form.get('NroExpediente').value;
    this.expediente.AnioExpediente = this.form.get('AnioExpediente').value;
    this.expediente.Juzgado = this.form.get('Juzgado').value;
    this.expediente.Materia = this.form.get('Materia').value;
    this.expediente.Motivo = this.form.get('Motivo').value;
    this.expediente.Partes = this.partes;
    this.expService.postExpediente(this.expediente).subscribe(exp => {
      if(exp){
        this.form.reset(this.forminicio);
        this.partes = [];
        this.dataSource = new MatTableDataSource(this.partes);
        this.snackbar.open('bien hecho!', 'Expediente registrado', {
          duration: 10000
        });
      }
    })
  }

  getDependenciasTipo(){
    this.depservice.getAllTipo("1").subscribe(res=>{
      this.deps=[];
      this.deps = res;
    })
  }

  applyFilter(filterValue:string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  agregarParte(){
    delete this.parte._id;
    this.parte.TipoDocumento = this.parteform.get('TipoDocumento').value;
    this.parte.Documento = this.parteform.get('Documento').value;
    this.parte.ApellidoP = this.parteform.get('ApellidoP').value;
    this.parte.ApellidoM = this.parteform.get('ApellidoM').value;
    this.parte.Nombre = this.parteform.get('Nombre').value;
  }

  eliminar(data){
        var i= this.partes.indexOf(data);
        this.snackbar.open('bien hecho!', 'Acto Procesal Eliminado', {
          duration: 10000
        });
        this.partes.splice(i,1);
        this.dataSource= new MatTableDataSource(this.partes);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator= this.paginator;
  }



  

  

}
