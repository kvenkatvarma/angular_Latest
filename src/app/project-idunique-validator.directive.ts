import { Directive } from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectsService } from './projects.service';
import { map } from 'rxjs/operators';
import { Project } from './project';
@Directive({
  selector: '[appProjectIDUniqueValidator]',
  providers:[{provide:'NG_ASYNC_VALIDATORS',useExisting:ProjectIDUniqueValidatorDirective,multi:true}]
})
export class ProjectIDUniqueValidatorDirective implements AsyncValidator{

  constructor(private projectService:ProjectsService) { }
  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
   return this.projectService.getProjectByProject(control.value).pipe(map((existingroject:Project)=>{
       if(existingroject != null)
       {
        return {uniqueProjectID :{valid:false}};
       }
       else
       {
        return null;
       }
    }));
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
