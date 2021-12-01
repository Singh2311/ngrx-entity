import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseAction } from "./action-types";
import { allCoursesLoaded } from "./courses.action";
import { CoursesHttpService } from "./services/courses-http.service";


@Injectable()
export class CoursesEffects {
    // ofType use to filter the stream based on string value or action creators
    
    loadCourses = createEffect(
        ()=> this.actions$.pipe(
            ofType(CourseAction.loadAllCourses),
            concatMap(action => this.coursesHttpService.findAllCourses()),
            map(courses => allCoursesLoaded({courses}))
            
            )
    );
    saveCourse$  = createEffect(
        ()=>  this.actions$.pipe(
            ofType(CourseAction.courseUpdated),
            concatMap(action => this.coursesHttpService.saveCourse(
                action.update.id,action.update.changes
            ))
        ),
        {dispatch: false}
    )
     

     constructor(private actions$ :  Actions,
        private coursesHttpService:CoursesHttpService
        ){

     }

}