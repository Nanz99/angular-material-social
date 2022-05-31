import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    console.log('adwdwadwa', this.route.snapshot.paramMap);
    // console.log(this.route.snapshot.paramMap.get('id'));
    // console.log(this.route.snapshot.params['id']);
    // console.log(this.route.params.pipe().subscribe(({id}) => console.log(id)));
  }
  postId: any;
}
