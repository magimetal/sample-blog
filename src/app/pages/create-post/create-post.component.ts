import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  pending: boolean = false;
  createForm = this.formBuilder.group({
    title: '',
    text: '',
  });

  constructor(
    private blogService: BlogService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSave() {
    if (!this.pending) {
      this.pending = true;
      this.blogService
        .createPost(this.createForm.value.title, this.createForm.value.text)
        .subscribe(() => {
          // TODO: we assume this works for now, handle errors then
          this.router.navigate(['']).then();
        });
    }
  }
}
