import { ClientLocation } from "./client-location";

export class Project {
  projectID:any;
  projectName:any;
  dateOfStart:string;
  teamSize:any;
  active :boolean | any;
  status:string | any;
  clientLocationID : number | any;
  clientLocation : ClientLocation | any;
  constructor(){
   this.projectID = 0;
   this.projectName = null;
   this.dateOfStart = null;
   this.teamSize = 0;
   this.active = true;
   this.status = null;
   this.clientLocationID = null;
   this.clientLocation = new ClientLocation();
  }
}
