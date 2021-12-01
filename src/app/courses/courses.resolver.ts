import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./courses.action";
import { areCoursesLoaded } from "./courses.selector";


@Injectable()

export class CoursesResolver implements Resolve<any> {
        loading:boolean = false;

        constructor(private store:Store<AppState>){

        }
        resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
                return this.store.pipe(
                    select(areCoursesLoaded),
                    tap( coursesLoaded =>{
                        if(!this.loading && !coursesLoaded){
                            this.loading = true;
                            this.store.dispatch(loadAllCourses());
                        }
                    }),
                    filter(coursesLoaded => coursesLoaded),
                    first(),
                    finalize(()=> this.loading = false)
                )
        }
}