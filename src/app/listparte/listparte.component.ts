import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { ParteSchema} from '../services/models/parte';
import { ParteService}  from '../services/parte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent} from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vex-listparte',
  templateUrl: './listparte.component.html',
  styleUrls: ['./listparte.component.scss']
})
export class ListparteComponent implements OnInit {
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  parte:ParteSchema;
  partes:ParteSchema[]=[];
  dataSource: MatTableDataSource<ParteSchema>;
  displayedColums:string[]=[
    'Documento','Nombre','ApellidoP','ApellidoM','Eliminar'
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
    this.getUsuarios();
    this.getPartes();
  }

  getPartes(){
    this.parteservice.getAll().subscribe(res=>{
      this.partes=[];
      this.partes=res;
      this.dataSource= new MatTableDataSource(this.partes);
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
    var i= this.partes.indexOf(data);
     this.parteservice.deleteParte(data).subscribe(res=>{
      if(res!=null){
        this.snackbar.open('bien hecho!', 'Parte Eliminada', {
          duration: 10000
        });
        this.partes.splice(i,1);
        this.dataSource= new MatTableDataSource(this.partes);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator= this.paginator;
     }
     })
  }

  getUsuarios(){
    this.userdatos.getAllUsers().subscribe(res=>{
      this.responsables=res;
    })
  }

}
