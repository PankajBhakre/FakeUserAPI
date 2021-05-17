import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers:any = [];
  pagination = {};
  pages = [1,2,3,4,5];
  disableNext = false;
  disablePrevious = true;
  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getAllDetails().subscribe(res => {
      this.allUsers = res[0];
      this.pagination = this.allUsers.meta.pagination;
    })
  }

  pageMove(page: any, action: string){
    this.pages = this.pages.map(data => {
      if(this.pages[0] ===1 && action == 'back') {
        this.disablePrevious = false;
        return data;
      }
      if(action ==='back') {
        return data = data - 5 ;
      } else {
        return data = data + 5 ;
      }
    })
  }
  showList(index:number) {
    this.service.getUserperPage(index).subscribe(data => {
      this.allUsers = data;
    })
  }

}
