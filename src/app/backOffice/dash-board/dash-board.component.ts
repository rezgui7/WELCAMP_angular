import { Component, OnInit } from '@angular/core';
import { ProcessingImageService } from 'src/app/frontOffice/services/processing-image.service';
import { ToolsService } from '../services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Tool } from 'src/app/_model/tool.model';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  listTools:any;



  constructor(private route: ActivatedRoute,
    private http:ToolsService,
    private processingImageService:ProcessingImageService,
    private r: Router
    ){}

  ngOnInit(): void {
    this.getAllToolOffers();
  }
  public getAllToolOffers(){
    this.http.getAllToolOffers2()
    .pipe(
      map(
        (x:Tool[],i)=> x.map(
          (tool:Tool)=>this.processingImageService.createImage(tool)
        )
      )
    )
    .subscribe(
      (resp:Tool[]) => {
        console.log(resp);
        
        this.listTools=resp;
      }
      );
      
    
  }

  ShowDetails(id:any){
    this.r.navigate(['/admin/promo',{id:id}]);
  }
  applyPromo(id:any){
    this.r.navigate(['/admin/promo',{id:id}]);
  }
}
