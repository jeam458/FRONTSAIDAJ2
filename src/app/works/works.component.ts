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

@Component({
  selector: 'vex-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  tarea:tareaSchema;
  tareas:tareaSchema[]=[];
  dataSource: MatTableDataSource<tareaSchema>;
  displayedColums:string[]=[
    'Expediente','Tipo','Fecha', 'Eliminar'
  ]
  constructor(private workservice:WorksService,
    private router:Router,
    private snackbar:MatSnackBar,
    private auth:AuthService) { }

    ngOnInit(): void {
      this.getTareasCli();
    }
  
    getTareasCli(){
      //console.log(this.auth.mostrarDatos()._id);
      this.workservice.getTUserEstado(this.auth.mostrarDatos()._id,2).subscribe(res=>{
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
