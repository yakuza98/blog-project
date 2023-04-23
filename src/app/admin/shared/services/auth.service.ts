import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "../../../../enviroments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService{
  // error$ - variable of rxjs (SUBJECT)
  public error$:  Subject<string> = new Subject<string>()
  constructor(private http: HttpClient) {}

  get token(): any {
    // getting date of expiresIn of token(from Local Storage)
    // @ts-ignore
    const expDate= new Date (localStorage.getItem( 'fb-token-exp'))
    // chek if New Date from token > expDate.(чи не вийшов час сесії токену, якщо вийшов тоді - logout())
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }
  login(user: User): Observable<any>{
    // returnSecureToken from Firebase should be always - true. After in result I'll have key:expiresIn of token
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
     .pipe(
       tap <FbAuthResponse| any> (this.setToken),
       catchError(this.handleError.bind(this))
     )

  }
  logout(){
    this.setToken(null)
  }
  isAuthenticated():boolean{
    return !!this.token
  }
  // обробка помилок валідності даних
  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Your email is incorrect')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Your password is incorrect')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Your email is not found')
        break

    }
    return throwError(error)
  }
  private setToken(response:FbAuthResponse | null){
    // if response(not a null) - then :
    if (response) {
      // getting time of expiresIn
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      // save my token in LocalStorage.
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    }else {
      localStorage.clear()
    }

  }
}
