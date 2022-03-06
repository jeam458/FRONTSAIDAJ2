import { ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { ParteService } from '../services/parte.service';
import { ParteSchema } from '../services/models/parte';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import { AuthService} from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-parte',
  templateUrl: './parte.component.html',
  styleUrls: ['./parte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class ParteComponent implements OnInit {
  parte: ParteSchema;
  form:FormGroup
  tiposDocumento=[
    {id:'DNI'},
    {id:'PASAPORTE'},
    {id:'CARNET EXTRANJERIA'}
  ]

  forminicio={
    Nombre:'',
    ApellidoM:'',
    ApellidoP:'',
    Documento:'',
    TipoDocumento:'', 
   } 
  constructor(private snackbar: MatSnackBar, 
              private parteservice:ParteService,
              private fb: FormBuilder, 
              private userdatos:AuthService) { }

  ngOnInit(): void {
    this.inicializarform();
    this.parte = this.inicializarParte();
    this.OnChanges();
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
    this.form.get('Documento').valueChanges.subscribe(res =>{
      
      if(res.toString().length === 8){
        console.log(res);
        this.parteservice.getdni(res.toString()).subscribe(data=> {
          console.log(data);
          this.form.patchValue({'Nombre':data.name})
          this.form.patchValue({'ApellidoP':data.paternal_surname})
          this.form.patchValue({'ApellidoM':data.maternal_surname})
        })  
      }
    })
  }

  inicializarform(){
    this.form=this.fb.group({
      Nombre:['',Validators.required],
      ApellidoM:[''],
      ApellidoP:['',Validators.required],
      Documento:['',Validators.required],
      TipoDocumento:['',Validators.required],
    })
  }

  cancelar(){
    this.form.reset();
  }

  getDni(dni){
     this.parteservice.getdni(dni).subscribe(res =>{
       console.log(res)
     })
  }

  guardar(){
    delete this.parte._id;
    this.parte.TipoDocumento = this.form.get('TipoDocumento').value;
    this.parte.Documento = this.form.get('Documento').value;
    this.parte.ApellidoP = this.form.get('ApellidoP').value;
    this.parte.ApellidoM = this.form.get('ApellidoM').value;
    this.parte.Nombre = this.form.get('Nombre').value;
    this.parteservice.postParte(this.parte).subscribe(res=>{
      if(res){
        this.form.reset(this.forminicio);
        this.snackbar.open('bien hecho!', 'Parte registrada', {
          duration: 10000
        });
      }
    })
  }

}
