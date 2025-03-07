import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient:HttpClient) { }

  getAllProjects():Observable<Project[]>{
    // var currentUser = {token : ""};
    // var headers = new HttpHeaders();
    // headers = headers.set("Authorization","Bearer ");
    // if(sessionStorage.currentUser != null){
    //   currentUser = JSON.parse(sessionStorage.currentUser);
    //   headers = headers.set("Authorization","Bearer " + currentUser.token);
    // }

    return this.httpClient.get<Project[]>("/api/projects").pipe(map(
      (data:Project[])=>{
        for(let i =0; i <data.length;i++)
        {
          data[i].teamSize = data[i].teamSize * 100;
        }
         return data;
      }
    ));
  }

  insertProject(newProject:Project):Observable<Project>{
    return this.httpClient.post<Project>("/api/projects",newProject);
  }

  updateProject(existingroject:Project):Observable<Project>{
    return this.httpClient.put<Project>("/api/projects",existingroject);
  }
 deleteProject(projectID:number):Observable<string>{
    return this.httpClient.delete<string>("/api/projects?projectID =" + projectID);
  }

  searchProjects(searchBy:string, searchText:string):Observable<Project[]>{
   return this.httpClient.get<Project[]>("api/projects/search/" + searchBy + "/" + searchText)
  }
}
