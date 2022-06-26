import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCrud';
  displayedColumns: string[] = ['nombreProyecto', 'numIntegrantes', 'fechaInicio', 'carrera','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api: ApiService ){

  }

  ngOnInit(): void {
    this.getAllResidencias();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllResidencias();
      }
    })
  }

  getAllResidencias(){
    this.api.getResidencia()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching th records!!!!")
      }
       
    })    
  }

  editResidencias(element: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: element
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
      this.getAllResidencias();
      }
    })
  }

  deleteResidencia(id:number){
    this.api.deleteResidencia(id)
    .subscribe({
      next:(res)=>{
        alert("Residencia eliminada correctamente");
        this.getAllResidencias();
      },
      error:()=>{
        alert("Error al eliminar la residencia");
      }
    })
  }


}
