import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../services/tools.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Tool } from 'src/app/_model/tool.model';
import { ProcessingImageService } from '../services/processing-image.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-tool-details',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.css']
})
export class ToolDetailsComponent implements OnInit{
  selectedProductIndex = 0;
  tool:any ;
  listTools:any;

  constructor(private route: ActivatedRoute,
    private http:ToolsService,
    private r:Router,
    private processingImageService:ProcessingImageService){}
  ngOnInit(): void {
    this.tool = this.route.snapshot.data['tool'];
    console.log(this.tool.idToolOffer)
    this.getAllToolOffers();

  }
  changeIndex(index:any) {
    this.selectedProductIndex = index;
  }

  public getAllToolOffers(){
    this.http.getAllToolOffers()
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

  addToCart(quantity:any,toolId:any) {
    
    this.http.addToCart(quantity,toolId,1).subscribe(
      (response) => {
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
    location.reload();

    console.log(quantity);
  }
}
