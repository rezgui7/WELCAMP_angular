import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../services/tools.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  listTools:any;
  listTool:any;
  

  constructor(private route: ActivatedRoute,
    private http:ToolsService,
    private dialogRef: MatDialog){}


  ngOnInit(): void {
     
      this.http.getAllCartItems2(1).subscribe(res=>{console.log(Object.keys(res));
        console.log(res);this.listTools=res});
    }

  
}
