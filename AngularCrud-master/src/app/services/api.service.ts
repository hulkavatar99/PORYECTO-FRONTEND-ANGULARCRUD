import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { 
  }

  postResidencia(data: any){
   return this.http.post<any>("http://localhost:3000/residencias", data);   
  }

  getResidencia(){
    return this.http.get<any>("http://localhost:3000/residencias");
  }

  putResidencia(data:any, id:any){
    return this.http.put<any>("http://localhost:3000/residencias/"+id, data);
  }

  deleteResidencia(id:any){
    return this.http.delete<any>("http://localhost:3000/residencias/"+id);
  }

}
