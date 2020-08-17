import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class JoinGameGuard implements CanActivate {
  constructor(private FS: AngularFirestore, private snackBar: MatSnackBar, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> {
      console.log(next.params.gameId)
      return this.FS.collection('pictionary').doc(`${next.params.gameId}`).valueChanges().pipe(
        map(game => {
          console.log(game);
          
          if(game){
            if (game['users'].length < 9)
            {return true}
          }
          this.snackBar.open("A game with this ID does not exist. Try again.", null, {
            duration: 5000,
          })
          this.router.navigate(['/home'])
          return false;
        })
      );
    }
    
  }