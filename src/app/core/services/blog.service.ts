import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  BlogApiGetResponseMulti,
  BlogApiGetResponseSingle,
  BlogApiPutResponse,
  BlogPost,
} from '../models/blog.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogPosts$: ReplaySubject<BlogPost[]> = new ReplaySubject<BlogPost[]>(1);
  blogSelectedPost$: ReplaySubject<BlogPost> = new ReplaySubject<BlogPost>(1);

  constructor(private http: HttpClient) {}

  fetchPosts() {
    this.http
      .get<BlogApiGetResponseMulti>(environment.blogApiUrl)
      .subscribe((data) => {
        if (data.response) {
          this.blogPosts$.next(data.response);
        }
      });
  }

  fetchPostById(id: string) {
    this.http
      .get<BlogApiGetResponseSingle>(`${environment.blogApiUrl}/${id}`)
      .subscribe((data) => {
        if (data.response) {
          this.blogSelectedPost$.next(data.response);
        }
      });
  }

  createPost(title: string, text: string) {
    return this.http.post<BlogApiPutResponse>(environment.blogApiUrl, {
      title: title,
      text: text,
    });
  }

  updatePost(id: string, title: string, text: string) {
    this.http
      .put<BlogApiPutResponse>(`${environment.blogApiUrl}/${id}`, {
        title: title,
        text: text,
      })
      .subscribe((data) => {
        if (data.response) {
          this.fetchPostById(id);
        }
      });
  }

  deleteAllPosts() {
    return this.http.delete(environment.blogApiUrl);
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.blogApiUrl}/${id}`);
  }

  // should be used for development purposes only
  generateSamplePosts() {
    return this.http.get(`${environment.blogApiUrl}/generateSampleData`);
  }
}
