import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public rootApi = 'https://gorest.co.in/public-api';
  constructor(private http: HttpClient) { }


  getAllDetails(){
    let user = this.http.get(this.rootApi + '/users?page=1');
    let post = this.http.get(this.rootApi + '/posts?page=1');
    let cmnt = this.http.get(this.rootApi + '/comments?page=1');
    return forkJoin([user,post,cmnt]);
  }

  sendComment(data: any) {
    headers: {
      return this.http.post(`${this.rootApi}posts/`+data.userId+`/comments`,data.comment)
    }
  }

  getUserperPage(page: number) {
    return this.http.get(`${this.rootApi}/users?page=`+page);
  }
}
