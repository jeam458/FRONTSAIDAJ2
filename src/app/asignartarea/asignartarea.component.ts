import { ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { WorksService } from '../services/works.service';
import { tareaSchema } from '../services/models.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import { AuthService} from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-asignartarea',
  templateUrl: './asignartarea.component.html',
  styleUrls: ['./asignartarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AsignartareaComponent implements OnInit {
  tarea:tareaSchema;
  form: FormGroup;
  estados=[
    {id:0,name:'pendiente'},
    {id:1,name:'en proceso'},
    {id:2,name:'concluido'}
  ]
  prioridades=[
    {id:0, name:'normal'},
    {id:1, name:'urgente'},
    {id:2, name:'muy urgente'}
  ]
  tipos_tareas=[
    {id:'CALIFICACION'},
    {id:'BOLETIN'},
    {id:'ESCANEO'},
    {id:'AUTO DE CONSENTIDA'},
    {id:'REGISTRO BIOMETRICO'},
    {id:'RENOVACION DE CAPTURA'},
    {id:'REMISION CARPETAS'},
    {id:'AUTO DE REHABILITACION'},
    {id:'VERIFICACION DE ACTAS'},
    {id:'CLASIFICACION DE EXPEDIENTE'},
    {id:'ATUALIZACION DE SIJ'},
    {id:'AUTOS DE REHABILITACION'},
    {id:'ARCHIVO'},
    {id:'RENOVACION DE CONDENAS'},
    {id:'MATERIALIZACION DE EXPEDIENTES (IMPRESIONES)'},
    {id:'AUDIENCIA'}
  ]
  Tareas_Principales=[
    {id:'0',name:'Verificación , actualización y posterior asociado al SIJ de requerimientos y/o solicitudes ingresados durante la época de pandemia'},
    {id:'1',name:'Verificación, Actualización y debido asociado del índice de acta de audiencia y de audio en el Sistema Ingrado Judicial durante la época de pandemia'},
    {id:'2',name:'Jornadas maratónicas de audiencias coordinadas y consensuadas con CDI'},
    {id:'3',name:'Actas pendientes de elaborar y asociar al Sistema Integrado  Judicial (SIJ)'},
    {id:'4',name:'Verificación y Actualización del Sistema Integrado Judicial de las actuaciones realizadas durante la época de pandemia'},
    {id:'5',name:'Procesos penales se encuentran pendientes de actualizar el estado procesal en el SIJ'},
    {id:'6',name:'Requerimientos, solicitudes, expedientes judiciales, expedientes fiscales que se encuentran pendientes de remitir al Archivo Modular y/o archivo del Ministerio Publico'},
    {id:'7',name:'Procesos penales se encuentran pendientes de formar  cuaderno de ejecución - inscripción de sentencias penales y su correspondiente elaboración del boletín de condena'},
    {id:'8',name:'1940, Expedientes pendientes de depurar y remitir al Archivo Central- Archivo  Penal'},
    {id:'9',name:'1940, Expedientes con posible emisión de sobreseimientos, absoluciones, prescripciones, y otras figuras procesales que extingan la acción penal; rehabilitaciones'},
    {id:'10',name:'Archivo definitivo'},
    {id:'11',name:'Proyección de sentencia'}
  ]
  forminicio={
    nombre:'',
    descripcion:'',
    prioridad:'',
    estado:'',
    tipo:[]
   }
  responsables:any;
  constructor(private snackbar: MatSnackBar, 
              private tareaservice:WorksService,
              private fb: FormBuilder, 
              private userdatos:AuthService) { }

  ngOnInit(): void {
    this.inicializarform();
    this.tarea=this.inicializarTarea();
    //this.form.patchValue({'estado':0})
    //this.form.patchValue({'prioridad':0})
    this.getUsuarios();
    this.OnChanges();
  }

  OnChanges():void{
    this.form.get('tipo').valueChanges.subscribe(val => {
      console.log(val);
      if(val!=''){
        this.tarea.tipo=val;
        console.log(this.tarea.tipo);
      }
    })
    this.form.get('prioridad').valueChanges.subscribe(val => {
      console.log(val);
      if(val!=''){
        this.tarea.prioridad=val;
      }
    })
    this.form.get('estado').valueChanges.subscribe(val => {
      console.log(val);
      if(val!=''){
        this.tarea.estado=val;
      }
    })
    this.form.get('responsable').valueChanges.subscribe(val => {
      console.log(val);
      if(val!=''){
        this.tarea.responsable=val;
      }
    })
    this.form.get('principal').valueChanges.subscribe(val=>{
      console.log(val);
      if(val!=''){
        this.tarea.principal=val;
      }
    })
  }

  
  inicializarTarea(){
    var tarea: tareaSchema;
    tarea={
      _id:'',
      nombre:'',
      principal:'',
      tipo:[],
      prioridad:0,
      descripcion:'',
      estado:0,
      fecha:new Date(),
      fechafin:new Date(),
      responsable:''
    }
    return tarea;
  }

  inicializarform(){
    this.form=this.fb.group({
      nombre:['',Validators.required],
      descripcion:[''],
      prioridad:[''],
      principal:['',Validators.required],
      estado:['',Validators.required],
      tipo:[[],Validators.required],
      responsable:['',Validators.required]
    })
  }
  
  cancelar(){
    this.form.reset();
  }

  getUsuarios(){
    this.userdatos.getAllUsers().subscribe(res=>{
      this.responsables=res;
    })
  }

  guardar(){
    //console.log("guardando");
    //console.log( this.form.get('nombre').value)
    delete this.tarea._id;
    this.tarea.nombre= this.form.get('nombre').value;
    this.tarea.descripcion= this.form.get('descripcion').value;
    this.tarea.prioridad= this.form.get('prioridad').value;
    this.tarea.estado= this.form.get('estado').value;
    this.tarea.principal=this.form.get('principal').value;
    this.tarea.responsable= this.form.get('responsable').value;
    //this.tarea.responsable= this.userdatos.mostrarDatos()._id;
    console.log(this.tarea);
    this.tareaservice.postTarea(this.tarea).subscribe(res=>{
      this.form.reset(this.forminicio);
      //this.inicializarform();
      this.snackbar.open('bien hecho!', 'Tarea registrada', {
        duration: 10000
      });
    })
  }

}
