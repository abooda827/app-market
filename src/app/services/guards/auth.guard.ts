import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  canActivate(route : ActivatedRouteSnapshot, state:RouterStateSnapshot): 
    boolean | Observable<boolean> | Promise<boolean>{
      return new Promise(resolve=>{
        this.authService.user.subscribe(user=>{
          if (user){
            resolve(true);
          }
          else {
            this.router.navigate(['/login']);
            resolve(false);
          }
        })
      })
  }
}
