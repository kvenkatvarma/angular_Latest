import { Component, OnInit,ViewChild } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { Project } from 'src/app/project';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationsService } from 'src/app/client-locations.service';
import {NgForm} from  '@angular/forms';
import * as $ from "jquery";
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects:Project[];
  clientLocations: ClientLocation[] =[];
  newProject:Project = new Project();
  editProject:Project = new Project();
  editIndex:any = null;
  deleteProject:Project = new Project();
  deleteIndex:any = null;
  searchBy :string = "ProjectName";
  searchText:string = "";
  @ViewChild("newForm") newForm:NgForm;
  @ViewChild("editForm") editForm:NgForm;


  constructor(private projectService:ProjectsService,private clientLocationService:ClientLocationsService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(
      (response:Project[])=>{
       this.projects = response;
      }
    );
    this.clientLocationService.getClientLocations().subscribe(
      (response)=>{
        this.clientLocations = response;
      }
    );
  }

  onSaveClick(){
    if(this.newForm.valid)
    {   
    this.newProject.clientLocation.clientLocationID = 0;
    this.projectService.insertProject(this.newProject).subscribe(
      (response)=>{
        var p:Project = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.active = response.active;
        p.clientLocationID = response.clientLocationID;
        p.status = response.status;

        this.projects.push(p);

        this.newProject.projectID = null;
        this.newProject.projectName = null;
        this.newProject.teamSize = null;
        this.newProject.dateOfStart = null;
        this.newProject.active = null;
        this.newProject.clientLocationID = null;
        this.newProject.status = null;
        $('#newFormCancel').trigger("click");
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  }
  onNewClick(event){
   this.newForm.resetForm();
  }
  onEditClick(event:any,index:number){
    this.editForm.resetForm();
    setTimeout(() => {
   this.editProject.projectID = this.projects[index].projectID;
   this.editProject.projectName = this.projects[index].projectName;
   this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-");
   this.editProject.teamSize = this.projects[index].teamSize;
   this.editProject.active = this.projects[index].active;
   this.editProject.clientLocationID = this.projects[index].clientLocationID;
   this.editProject.status = this.projects[index].status;

   this.editIndex = index;
    }, 100);
   
  }
  onUpdateClick(){
    if(this.editForm.valid)
    {    
   this.projectService.updateProject(this.editProject).subscribe(
    (response:Project)=>{
      var p:Project = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.active = response.active;
        p.clientLocationID = response.clientLocationID;
        p.status = response.status;

        this.projects[this.editIndex] = p;
        this.editProject.projectID = null;
        this.editProject.projectName = null;
        this.editProject.dateOfStart = null;
        this.editProject.teamSize = null;
        this.editProject.active = null;
        this.editProject.clientLocationID = null;
        this.editProject.status = null;
         $("#editFormCancel").trigger("click");
    },
    ()=>{}
   );
  }
  }
onDeleteClick(event:any,index:number){
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
}
onDeleteConfirmClick(){
 this.projectService.deleteProject(this.deleteProject.projectID).subscribe(
  (response)=>{
    this.projects.splice(this.deleteIndex,1);
    this.deleteProject.projectID = null;
    this.deleteProject.projectName = null;
    this.deleteProject.dateOfStart = null;
    this.deleteProject.teamSize = null;
  },
  (error)=>{
    console.log(error);
  }
 );
}
onsearchClick(){
  this.projectService.searchProjects(this.searchBy,this.searchText).subscribe(
    (response)=>{
      this.projects = response;
    },
    (error)=>{
      console.log(error);
    }
  );
}
}
