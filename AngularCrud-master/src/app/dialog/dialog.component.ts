import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  actionBtn: string = "Guardar"

  resiForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private api : ApiService, 
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent> ) { }

  //Validacion de formulario
  ngOnInit(): void {
    this.resiForm = this.formBuilder.group({
        nombreProyecto: ['',Validators.required],
        numIntegrantes: ['',Validators.required],
        fechaInicio:  ['',Validators.required],
        carrera:['',Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Actualizar";  
      this.resiForm.controls['nombreProyecto'].setValue(this.editData.nombreProyecto);
      this.resiForm.controls['numIntegrantes'].setValue(this.editData.numIntegrantes);
      this.resiForm.controls['fechaInicio'].setValue(this.editData.fechaInicio);
      this.resiForm.controls['carrera'].setValue(this.editData.carrera);
    }
  }

  //Agrega la residencia
  addResidencias(){
    if(!this.editData){
      if(this.resiForm.valid){
      this.api.postResidencia(this.resiForm.value)
      .subscribe({
        next:(res)=>{
          alert("Residencia agregada ");
          this.resiForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error al agrgar la residencia");
        }
      })
     }
    } 
    else{
      this.updateResidencias();
    }
  }


  //actualizar la residencia
  updateResidencias(){
    console.log("");
    this.api.putResidencia(this.resiForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Actualizacion realizada");
        this.resiForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error al actualizar la recidencia");
      }
    })
  }

}
