import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tareaSchema} from '../services/models.service';

@Component({
  selector: 'vex-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  tarea:tareaSchema;
  estado:any='';
  estados=[
    {id:0,name:'pendiente'},
    {id:1,name:'en proceso'},
    {id:2,name:'concluido'}
  ]
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datosEntrada: tareaSchema,) { }

  ngOnInit(): void {
    this.tarea= this.datosEntrada;
  }

  cambioestado(){
    if(this.estado!=''){
      this.tarea.estado=this.estado;
      this.dialogRef.close(this.tarea);
    }
  }
  cancelar(){
    this.dialogRef.close();
  }

}
