import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/Services/data.service';
export class response {
  code: any;
  data : any;
  meta:any
  
}
@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  allUsers: any;
  allPosts: any;
  allComments:any;
  detailedData:any;
  currentPost : any;
  currentComments:any[] =[];
  pagination = {};
  commentEnable:boolean = false;
  allData :any;
  currentPage:number = 0;
  inputComment:any;
  authenticated:any;
  showAlert='';
  constructor(private service: DataService, private fb: FormBuilder) { }

  authForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.authForm.controls;
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAllDetails().subscribe(resp=>{
      this.allUsers = resp[0];
      this.allPosts = resp[1];
      this.allComments = resp[2];
      this.detailedData =  this.allPosts.data.map((post: any) => {
        this.allUsers.data.forEach((user: any) =>{
          if(post.user_id === user.id) {
            post = Object.assign({},post,{userDetail : user});
          }
        })
        return post;
      });
      this.allData = [...this.detailedData ];
      console.log(this.detailedData)
      if(this.detailedData) {
        const length = this.detailedData.length;
        let num = length/10;
        let rem = length%10;
        if(rem > 0) {
          num +=1;
        }
        this.pagination = Array(num).fill(0).map((x,i)=>i);
      }
      this.showPage(0);
  })
  }
  
  showPage(num:number){
    let newData = [];
    let startIndex = num*10;
    this.currentPage = startIndex;
    let lastIndex = num + 9;
    for(let i=0;i<this.detailedData.length;i++){
      if(i>=startIndex && i<=lastIndex) {
        newData.push(this.detailedData[i]);
      }
    }
    this.allData = newData;
    console.log('this.allData',this.allData)
  }
  
  readmore(currentPost: any) {
    this.currentComments = [];
    this.currentPost = currentPost;
      this.allComments.data.forEach((comment:  any) => {
        if(comment.post_id === currentPost.id) {
          this.currentComments.push(comment);
        }
      }); 
      console.log(this.currentComments);
  }
  
  getUser() {
    let user:any = localStorage.getItem('user');
    // console.log('local',JSON.parse(user))
    // if(user.name !== "" && user.email !== ""){
    //   this.authenticate(user);
    // } 
  }
  
  authenticate(val: any) {
    let closeWindow: any= document.getElementById('closeIt');
    console.log(val,this.authForm.value)
    localStorage.setItem('user',JSON.stringify(this.authForm.value));
     if(val.name !== "" && val.email !== ""){
      this.commentEnable = true;
      this.authenticated = true;
      closeWindow.click();
     } else {
      this.commentEnable = false;
     }
    
  }
  
  shortName(name: string){
    let newName;
    if(name.split(' ').length>1) {
      newName = name.split(' ')[0].substring(0,1) + name.split(' ')[1].substring(0,1);
      return newName.toUpperCase();
    } else if(name.length > 2) {
      newName = name.substring(0, 2);
      console.log(name,newName)
      return newName.toUpperCase();
    }
  }
  
  sendComment() {
    this.showAlert = 'Sending....';
    let commentDetails = {name:this.authForm.value.name,email:this.authForm.value.email,body:this.inputComment};
    let data = {userId: this.currentPost.id, comment:commentDetails}
    this.service.sendComment(data).subscribe(commentResp => {
        this.inputComment = '';
        this.showAlert = 'Done';
        setTimeout(()=>{
          this.showAlert ='';
        },1500)
      
    })
  }

}
