import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { DependenciaSchema} from '../services/models/dependencia';
import { DependenciaService}  from '../services/dependencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent} from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vex-list-dependencia',
  templateUrl: './list-dependencia.component.html',
  styleUrls: ['./list-dependencia.component.scss']
})
export class ListDependenciaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  acto:DependenciaSchema;
  deps:DependenciaSchema[]=[];
  dataSource: MatTableDataSource<DependenciaSchema>;
  displayedColums:string[]=[
    'Nombre','Referencia','Organo','Eliminar'
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

  responsables:any;
  usuario:any='';
  constructor(
    private depservice:DependenciaService,
    private router:Router,
    private snackbar:MatSnackBar,
    private auth:AuthService,
    private dialog: MatDialog,
    private userdatos:AuthService
  ) { }

  ngOnInit(): void {
    this.getDeps();
  }

  getDeps(){
    this.depservice.getAll().subscribe(res=>{
      this.deps=[];
      this.deps=res;
      this.dataSource= new MatTableDataSource(this.deps);
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
    var i= this.deps.indexOf(data);
     this.depservice.deleteDep(data).subscribe(res=>{
      if(res!=null){
        this.snackbar.open('bien hecho!', 'Dependencia Eliminada', {
          duration: 10000
        });
        this.deps.splice(i,1);
        this.dataSource= new MatTableDataSource(this.deps);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator= this.paginator;
     }
     })
  }

  getDependencia(id){
    for (let index = 0; index < this.deps.length; index++) {
      if(id === this.deps[index]._id){
        return this.deps[index].Nombre;
        break;
      }
    }
  }

  getOrgano(id){
    for(let index=0; index< this.tipos.length; index++){
      if(id === this.tipos[index].id){
        return this.tipos[index].name;
      }
    }
  }

}
