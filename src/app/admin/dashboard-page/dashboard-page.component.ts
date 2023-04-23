import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../shared/posts.service";
import {Post} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  posts: Post[] = []
  pSub: Subscription | any
  dSub: Subscription | any
  searchStr: string = ''
  constructor(
    private postsService: PostsService,
    private alert: AlertService
    ) {
  }
  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
    this.posts = posts
    })
}
  remove(id: any) {
      this.dSub = this.postsService.remove(id).subscribe(() => {
      // Видаляємо не потрібний елемент з масиву
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Post was deleted')
    })
  }
  // unsubscribing (відписка)
  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }

    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }
}
