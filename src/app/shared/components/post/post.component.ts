import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../admin/shared/interfaces";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  postLogo = 'https://cdn.freebiesupply.com/logos/large/2x/angular-icon-1-logo-svg-vector.svg'
  @Input() post: Post | any
  constructor() {
  }
  ngOnInit(){
  }

}
