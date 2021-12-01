import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseAction } from "../action-types";
import { compareCourses, Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded : boolean
    
}

export const adapter =  createEntityAdapter<Course>({
    sortComparer : compareCourses,
    selectId : course => course.id
});
export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded : false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseAction.allCoursesLoaded,(state,action)=>
        adapter.addAll(action.courses,
            {...state, allCoursesLoaded:true})
    ),

    on(CourseAction.courseUpdated,(state,action)=>
            adapter.updateOne(action.update,state)
    )
);

export const {
    selectAll
} = adapter.getSelectors();

