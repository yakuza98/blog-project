import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../admin/shared/posts.service";
import {Observable, switchMap} from "rxjs";
import {Post} from "../admin/shared/interfaces";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

    post$?: Observable<Post>
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
  }
  ngOnInit(){
      this.post$ = this.route.params
        // switchMap() дозволяє змінити напрямок стріму від params до потрібного стріму.
        .pipe(switchMap((params: Params) => {
          return this.postsService.getById(params ['id'])
        }))
  }

}
