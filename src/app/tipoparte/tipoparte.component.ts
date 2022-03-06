import { ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { ParteService } from '../services/parte.service';
import { TipoParteSchema } from '../services/models/tipoparte';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import { AuthService} from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-tipoparte',
  templateUrl: './tipoparte.component.html',
  styleUrls: ['./tipoparte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class TipoparteComponent implements OnInit {
  parte: TipoParteSchema;
  form:FormGroup
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
    ApellidoM:'',
    ApellidoP:'',
    Documento:'',
    TipoDocumento:'', 
   } 
  constructor(
    private snackbar: MatSnackBar, 
    private parteservice:ParteService,
    private fb: FormBuilder, 
    private userdatos:AuthService) { }

  ngOnInit(): void {
    this.inicializarform();
    this.parte = this.inicializarParte();
  }

  inicializarParte(){
    var tparte: TipoParteSchema;
    tparte={
      _id:'',
      Nombre:'',
      TipoParte:'',
      Especialidad:'',
      Autor:this.userdatos.mostrarDatos()._id,
      fecha:new Date()
    }
    return tparte;
  }

  inicializarform(){
    this.form=this.fb.group({
      Nombre:['',Validators.required],
      Especialidad:[''],
    })
  }
  cancelar(){
    this.form.reset();
  }

  guardar(){
    delete this.parte._id;
    this.parte.Especialidad = this.form.get('Especialidad').value;
    this.parte.Nombre = this.form.get('Nombre').value;
    this.parteservice.postTipoParte(this.parte).subscribe(res=>{
      if(res){
        this.form.reset(this.forminicio);
        this.snackbar.open('bien hecho!', 'Tipo Parte registrada', {
          duration: 10000
        });
      }
    })
  }


}
