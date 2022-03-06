import { ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { DependenciaService } from '../services/dependencia.service';
import { DependenciaSchema } from '../services/models/dependencia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import { AuthService} from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-dependencia',
  templateUrl: './dependencia.component.html',
  styleUrls: ['./dependencia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class DependenciaComponent implements OnInit {
  dep: DependenciaSchema;
  deps: DependenciaSchema[]=[];
  form:FormGroup
  tiposDocumento=[
    {id:'DNI'},
    {id:'PASAPORTE'},
    {id:'CARNET EXTRANJERIA'}
  ]

  tipos=[
    {id:'1', name:'JURISIDICCIONAL'},
    {id:'2', name: 'ADMINISTRATIVO'}
  ]

  Organos=[
    {id:'1', name:'SALA SUPREMA'},
    {id:'2', name:'SALA SUPERIOR'},
    {id:'3', name:'JUZGADO ESPECIALIZADO'},
    {id:'4', name:'JUZGADO MIXTO'},
    {id:'5', name:'JUZGADO DE PAZ LETRADO'},
    {id:'6', name:'JUZGADOD DE PAZ NO LETRADO'},
  ]

  forminicio={
    Nombre:'',
    Tipo:'',
    Referencia:'',
    Descripcion:'',
    Organo:''
   } 
  constructor(
    private snackbar: MatSnackBar, 
    private depservice:DependenciaService,
    private fb: FormBuilder, 
    private userdatos:AuthService) { }

  ngOnInit(): void {
    this.inicializarform();
    this.dep = this.inicializarDep();
    //this.getDependencias()
    this.OnChanges();
  }

  OnChanges():void{
    this.form.get('Tipo').valueChanges.subscribe(val => {
      console.log(val);
      if(val!=''){
        this.dep.Tipo=val;
        this.getDependenciasTipo(this.dep.Tipo);
      }
    })
  }

  getDependenciasTipo(Tipo){
    this.depservice.getAllTipo(Tipo).subscribe(res=>{
      this.deps=[];
      this.deps = res;
    })
  }

  getDependencias(){
    this.depservice.getAll().subscribe(res=>{
      this.deps=[];
      this.deps = res;
    })
  }

  inicializarDep(){
    var dep: DependenciaSchema;
    dep={
      _id:'',
      Nombre:'',
      Descripcion:'',
      Tipo:'',
      Organo:'',
      Referencia:'',
      Autor:this.userdatos.mostrarDatos()._id,
      fecha:new Date()
    }
    return dep;
  }

  inicializarform(){
    this.form=this.fb.group({
      Nombre:['',Validators.required],
      Referencia:[''],
      Organo:[''],
      Tipo:['',Validators.required],
      Descripcion:['',Validators.required],
    })
  }

  
  cancelar(){
    this.form.reset();
  }

  guardar(){
    delete this.dep._id;
    this.dep.Tipo = this.form.get('Tipo').value;
    this.dep.Referencia = this.form.get('Referencia').value;
    this.dep.Descripcion= this.form.get('Descripcion').value;
    this.dep.Nombre = this.form.get('Nombre').value;
    this.depservice.postDep(this.dep).subscribe(res=>{
      if(res){
        this.form.reset(this.forminicio);
        this.snackbar.open('bien hecho!', 'Dependencia registrada', {
          duration: 10000
        });
      }
    })
  }



}
