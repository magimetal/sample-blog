import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'edit', component: EditPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
