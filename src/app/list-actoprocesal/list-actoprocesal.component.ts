import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { ActoSchema} from '../services/models/actoprocesal';
import { ActoprocesalService}  from '../services/actoprocesal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent} from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vex-list-actoprocesal',
  templateUrl: './list-actoprocesal.component.html',
  styleUrls: ['./list-actoprocesal.component.scss']
})
export class ListActoprocesalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  acto:ActoSchema;
  actos:ActoSchema[]=[];
  dataSource: MatTableDataSource<ActoSchema>;
  displayedColums:string[]=[
    'Nombre','Especialidad','Organo','Eliminar'
  ]

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

  responsables:any;
  usuario:any='';
  constructor(
    private actoservice:ActoprocesalService,
    private router:Router,
    private snackbar:MatSnackBar,
    private auth:AuthService,
    private dialog: MatDialog,
    private userdatos:AuthService
  ) { }

  ngOnInit(): void {
    this.getActos();
  }

  getActos(){
    this.actoservice.getAll().subscribe(res=>{
      this.actos=[];
      this.actos=res;
      this.dataSource= new MatTableDataSource(this.actos);
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
    var i= this.actos.indexOf(data);
     this.actoservice.deleteActo(data).subscribe(res=>{
      if(res!=null){
        this.snackbar.open('bien hecho!', 'Acto Procesal Eliminado', {
          duration: 10000
        });
        this.actos.splice(i,1);
        this.dataSource= new MatTableDataSource(this.actos);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator= this.paginator;
     }
     })
  }

  buscarEsp(id):number{
    for(var i=0; this.Especialidades.length;i++){
      if(id == this.Especialidades[i].id){
        return i;
        break;
      }
    }
  }

  buscarOrgano(id):number{
    for(var i=0; this.Organos.length;i++){
      if(id == this.Organos[i].id){
        return i;
        break;
      }
    }
  }

}
