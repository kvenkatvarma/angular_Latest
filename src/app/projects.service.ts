import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient:HttpClient) { }

  getAllProjects():Observable<Project[]>{
    return this.httpClient.get<Project[]>("/api/projects");
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
}
