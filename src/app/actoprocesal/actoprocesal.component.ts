import { ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { ActoprocesalService } from '../services/actoprocesal.service';
import { ActoSchema } from '../services/models/actoprocesal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import { AuthService} from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-actoprocesal',
  templateUrl: './actoprocesal.component.html',
  styleUrls: ['./actoprocesal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class ActoprocesalComponent implements OnInit {
  acto: ActoSchema;
  form:FormGroup
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


  forminicio={
    Nombre:'',
    Especialidad:'',
    Organo:'', 
   } 
  constructor(
    private snackbar: MatSnackBar, 
    private actoservice:ActoprocesalService,
    private fb: FormBuilder, 
    private userdatos:AuthService
  ) { }

  ngOnInit(): void {
    this.inicializarform();
    this.acto = this.inicializarParte();
  }

  inicializarParte(){
    var tparte: ActoSchema;
    tparte={
      _id:'',
      Nombre:'',
      Organo:'',
      Especialidad:'',
      Autor:this.userdatos.mostrarDatos()._id,
      fecha:new Date()
    }
    return tparte;
  }
  
  inicializarform(){
    this.form=this.fb.group({
      Nombre:['',Validators.required],
      Especialidad:['',Validators.required],
      Organo:['',Validators.required]
    })
  }
  cancelar(){
    this.form.reset();
  }

  guardar(){
    delete this.acto._id;
    this.acto.Especialidad = this.form.get('Especialidad').value;
    this.acto.Nombre = this.form.get('Nombre').value;
    this.acto.Organo = this.form.get('Organo').value;
    this.actoservice.postActo(this.acto).subscribe(res=>{
      if(res){
        this.form.reset(this.forminicio);
        this.snackbar.open('bien hecho!', 'Acto Procesal registrado', {
          duration: 10000
        });
      }
    })
  }
}
