import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  selectedFile: any;
  text = '';
  posts: Array<any> = [];
  commentText: Array<string> = [];

  constructor(
    public userService: UserService,
    private router: Router,
    private storage: AngularFireStorage,
    public postService: PostService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.userService.user == undefined || this.userService.user == null) {
      let str = localStorage.getItem('user');
      if (str != null) {
        this.userService.user = JSON.parse(str);
      } else {
        this.router.navigate(['/login']);
      }
    }
    // this.postService
    //   .getPosts()
    //   .then((res: any) => {
    //     this.posts = res;
    //     for (let post of this.posts) {
    //       this.commentText.push('');
    //     }
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
      // console.log(this.postService.getPosts().then((res: any) => {console.log(res)}))
     this.postService.getAllPost().subscribe((res: any) => {
        this.posts = res;
        for (let post of this.posts) {
          this.commentText.push('');
        }
      })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  post() {
    this.snackbar.open('Creating the post...', '', { duration: 15000 });
    if (this.selectedFile != undefined || this.selectedFile != null) {
      this.uploadImage()
        .then((imageURL) => {
          console.log(imageURL);
          let postObj = {
            username: this.userService.user.username,
            text: this.text,
            imageURL: imageURL,
            likes: [],
            comments: [],
          };
          this.posts.push(postObj);
          this.postService
            .saveNewPost(postObj)
            .then((res: any) => {
              console.log(res);
              this.snackbar.open('Posted successfully', 'ok');
            })
            .catch((err: any) => {
              console.log(err);
            });
          this.selectedFile = undefined;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let postObj : Post = {
        username: this.userService.user.username,
        text: this.text,
        imageURL: '',
        likes: [],
        comments: [],
      };
      this.posts.push(postObj);
      this.postService
        .saveNewPost(postObj)
        .then((res: any) => {
          console.log(res);
          this.snackbar.open('Posted successfully', 'ok');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let imageURL = fileRef.getDownloadURL();
            imageURL.subscribe((url: any) => {
              if (url) {
                console.log(url);
                resolve(url);
              }
            });
          })
        )
        .subscribe((url: any) => {
          if (url) {
            console.log(url);
          }
        });

    });
  }

  like(postId: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        if (this.posts[i].likes.indexOf(this.userService.user.id) >= 0) {
          this.posts[i].likes.splice(
            this.posts[i].likes.indexOf(this.userService.user.id),
            1
          );
        } else {
          this.posts[i].likes.push(this.userService.user.id);
        }
        this.postService
          .updateLikes(this.posts[i])
          .then((res: any) => {
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }
  }

  comment(postId: any, commentIndex: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        let commentObj = {
          username: this.userService.user.username,
          comment: this.commentText[commentIndex],
        };
        this.posts[i].comments.push(commentObj);
        this.commentText[commentIndex] = '';
        this.postService.updateComments(this.posts[i]);
      }
    }
  }

  postSchema = {
    username: '',
    imageURL: '',
    text: '',
    likes: [],
    comments: [{ username: '', comment: '' }],
  };
}
