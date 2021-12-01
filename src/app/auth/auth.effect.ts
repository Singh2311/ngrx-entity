import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthAction } from "./action-types";


@Injectable()
export class AuthEffects{

    login$ = createEffect(()=>
    this.actions$.pipe(
        ofType(AuthAction.login),
        tap(action=>{
            localStorage.setItem('user',JSON.stringify(action['user']))
        })
    ),{dispatch:false}
    );

    logout$ = createEffect(()=>

        this.actions$.pipe(
            ofType(AuthAction.logout),
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login')

            })
        ),{
            dispatch:false
        }
    )
    

    constructor(private actions$:Actions,
        private router : Router){

       
        
      
        // login$.subscribe()
        // actions$.subscribe(action=>{

        //     if(action.type == '[Login Page] User Login'){
        //         localStorage.setItem('user',JSON.stringify(action['user']))
        //     }

        // })
    }
}