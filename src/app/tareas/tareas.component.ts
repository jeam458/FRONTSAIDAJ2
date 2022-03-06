import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { tareaSchema} from '../services/models.service';
import { WorksService}  from '../services/works.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent} from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vex-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  tarea:tareaSchema;
  tareas:tareaSchema[]=[];
  dataSource: MatTableDataSource<tareaSchema>;
  displayedColums:string[]=[
    'Expediente','Tipo','Fecha','Editar','Eliminar'
  ]
  constructor(private workservice:WorksService,
              private router:Router,
              private snackbar:MatSnackBar,
              private auth:AuthService,
              private dialog: MatDialog) { }

    ngOnInit(): void {
      this.getTareasCli();
    }
  
    getTareasCli(){
      //console.log(this.auth.mostrarDatos()._id);
      this.workservice.getTUserEstado(this.auth.mostrarDatos()._id,1).subscribe(res=>{
        console.log(res)
        this.tareas=res;
        this.dataSource= new MatTableDataSource(this.tareas);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator= this.paginator;
      })
    }
  
    applyFilter(filterValue:string){
      filterValue=filterValue.trim();
      filterValue=filterValue.toLowerCase();
      this.dataSource.filter=filterValue;
    }

    cambiarEstado(data){
      var i= this.tareas.indexOf(data);
       this.dialog.open(DialogComponent,{data}).afterClosed().subscribe(res=>{
         console.log(res);
         if(res!=null && res!= undefined){
          if(res.estado!=1){
            this.workservice.putTarea(res).subscribe(res=>{
              console.log(res);
              if(res!=null){
                 this.tareas.splice(i,1);
                 this.dataSource= new MatTableDataSource(this.tareas);
                 this.dataSource.sort=this.sort;
                 this.dataSource.paginator= this.paginator;
              }
            })
          }
         }
       })
    }

    eliminar(data){
      var i= this.tareas.indexOf(data);
       this.workservice.deleteTrea(data).subscribe(res=>{
        if(res!=null){
          this.snackbar.open('bien hecho!', 'Tarea Eliminada', {
            duration: 10000
          });
          this.tareas.splice(i,1);
          this.dataSource= new MatTableDataSource(this.tareas);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator= this.paginator;
       }
        
       })
    }

}
