import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../../core/models/blog.model';
import { BlogService } from '../../core/services/blog.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  selectedPostId!: string;
  pending: boolean = false;

  updatedTitle!: string;
  updatedText!: string;
  updateForm = this.formBuilder.group({
    title: '',
    text: '',
  });

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.selectedPostId = params['id'];
        this.blogService.fetchPostById(this.selectedPostId);
      } else {
        // TODO: this should do something involving a toast or redirect the user to the dashboard
        console.error('You did not pass an id');
      }
    });

    this.blogService.blogSelectedPost$.subscribe((data) => {
      this.updateForm.patchValue({ title: data.title, text: data.text });
      if (this.pending) {
        this.pending = false;
        // send back to dashboard
        this.router.navigate(['']).then();
      }
    });
  }

  onSave() {
    if (!this.pending) {
      this.pending = true;
      this.blogService.updatePost(
        this.selectedPostId,
        this.updateForm.value.title,
        this.updateForm.value.text
      );
    }
  }

  onCancel() {
    this.pending = false;
    this.router.navigate(['']).then();
  }

  onDelete() {
    if (!this.pending) {
      this.pending = true;
      this.blogService.deletePost(this.selectedPostId).subscribe(() => {
        // TODO: we assume this works for now, handle errors then
        this.router.navigate(['']).then();
      });
    }
  }
}
