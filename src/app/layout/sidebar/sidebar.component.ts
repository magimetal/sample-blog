import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../core/services/blog.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {}

  deleteAll() {
    this.blogService.deleteAllPosts().subscribe(() => {
      window.location.reload();
    });
  }
}
