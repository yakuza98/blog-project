import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../../../enviroments/environment";
import {map} from "rxjs/operators"

@Injectable({providedIn: 'root'})
export class PostsService {
  // this service for back-end
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post>{
    // fbDbUrl from database on firebase(далі редагуємо правила на firebase (read - читають дані всі;
    // write - зміни вносять лише авторизовані)
    // {"rules": {
    //     ".read": true,
    //     ".write": "auth != null"
    //   }}
    return this.http.post<Post|any>(`${environment.fbDbUrl}/posts.json`, post )
      .pipe(map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
      }))
  }
  getAll(): Observable<Post[]>{
    // Парисимо відповідь з серверу
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map( (response: {[key: string]: any})=> {
       return  Object
         .keys(response)
         .map(key => ({
           // ... розвертаємо response[key]
           ...response[key],
           id: key,
           date: new Date(response[key].date)
         }))
    }))
  }
  getById(id:string): Observable<Post>{
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      // parse info from DataBase.
      .pipe(map((post:Post)=> {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
  }
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)

  }
  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }
}
