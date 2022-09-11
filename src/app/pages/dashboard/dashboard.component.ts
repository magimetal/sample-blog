import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { BlogPost } from '../../core/models/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  blogPosts!: BlogPost[];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.fetchPosts();
    this.blogService.blogPosts$.subscribe((data) => {
      this.blogPosts = data;
    });
  }

  editBlogPost(post: BlogPost) {
    this.router.navigate(['edit'], { queryParams: { id: post.id } }).then();
  }
}
