import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { TipoParteSchema} from '../services/models/tipoparte';
import { ParteService}  from '../services/parte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent} from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'vex-list-tipoparte',
  templateUrl: './list-tipoparte.component.html',
  styleUrls: ['./list-tipoparte.component.scss']
})
export class ListTipoparteComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  parte:TipoParteSchema;
  partes:TipoParteSchema[]=[];
  dataSource: MatTableDataSource<TipoParteSchema>;
  displayedColums:string[]=[
    'Parte','Especialidad','Eliminar'
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
  constructor(private parteservice:ParteService,
    private router:Router,
    private snackbar:MatSnackBar,
    private auth:AuthService,
    private dialog: MatDialog,
    private userdatos:AuthService) { }

  ngOnInit(): void {
    this.getPartes();
  }

  getPartes(){
    this.parteservice.getTipoPartes().subscribe(res=>{
      this.partes=[];
      this.partes=res;
      this.dataSource= new MatTableDataSource(this.partes);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator= this.paginator;
    })
  }

  getEspecialidad(id){
    for (let index = 0; index < this.Especialidades.length; index++) {
      if(id === this.Especialidades[index].id){
        return this.Especialidades[index].name;
        break;
      }
      
    }
  }
  applyFilter(filterValue:string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  eliminar(data){
    var i= this.partes.indexOf(data);
     this.parteservice.deleteTipoParte(data).subscribe(res=>{
      if(res!=null){
        this.snackbar.open('bien hecho!', 'Tipo Parte Eliminada', {
          duration: 10000
        });
        this.partes.splice(i,1);
        this.dataSource= new MatTableDataSource(this.partes);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator= this.paginator;
     }
     })
  }
}
