import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  saveNewPost(postObj: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/posts', postObj).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  getPosts(): any {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/posts').subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }
  getAllPost() : Observable<Post[]> {
    return this.http
      .get('http://localhost:3000/posts')
      .pipe(
        switchMap((res :any) => {
          console.log('11111111111111111111111111111', res);
          return of(res);
        })
      );
  }
  updateLikes(postObj: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put('http://localhost:3000/posts/' + postObj.id, postObj)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err: any) => {
            reject(err);
          }
        );
    });
  }

  updateComments(postObj: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put('http://localhost:3000/posts/' + postObj.id, postObj)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err: any) => {
            reject(err);
          }
        );
    });
  }
}
