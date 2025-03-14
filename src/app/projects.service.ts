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
       return this.httpClient.get<Project[]>("/api/projects").pipe(map(
      (data:Project[])=>{
        for(let i =0; i <data.length;i++)
        {
          //data[i].teamSize = data[i].teamSize * 100;
        }
         return data;
      }
    ));
  }

  getProjectByProject(ProjectID:number):Observable<Project>{
    return this.httpClient.get<Project>("/api/projects/searchbyprojectid" + ProjectID);
  }
  insertProject(newProject:Project):Observable<Project>{
    var headers1 = new HttpHeaders();
    headers1.set("X-XSRF-TOKEN",sessionStorage.XSRFRequestToken);
    return this.httpClient.post<Project>("/api/projects",newProject,{headers:headers1});
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
