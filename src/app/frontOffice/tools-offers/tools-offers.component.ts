import { Component,OnInit } from '@angular/core';
import { ToolsService } from '../services/tools.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Tool } from 'src/app/_model/tool.model';
import { ProcessingImageService } from '../services/processing-image.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tools-offers',
  templateUrl: './tools-offers.component.html',
  styleUrls: ['./tools-offers.component.css'],
  providers:[ToolsService]
})
export class ToolsOffersComponent implements OnInit{
  listCategories:any;
  listNewArrival:any;
  listInPromotion:any;
  listTrend:any;
  image:any;
  imageData:any;
  imageDataUrl: any;
  toolDetail:any;
  isChecked :any;
  showLoadButton:any;
  pageNumber: number = 0;

  
  constructor(private route: ActivatedRoute,
              private http:ToolsService,
              private processingImageService:ProcessingImageService,
              private sanitizer: DomSanitizer,
              private r: Router){}

  ngOnInit(): void {
    console.log("on init.....");
    this.getAllToolOffers();
    this.getAllNewArrival();
    this.getAllInPromotion();
    this.getAllTrend();

    console.log(this.isChecked);
    console.log(this.listTools);
    console.log("filtred");

    console.log(this.filteredTools);
    
    
    //this.http.getAllToolOffers().subscribe(res=>{console.log(res);this.toolDetail=res});
    //this.http.getAllNewArrival().subscribe(res=>{console.log(res);this.listNewArrival=res});
    //this.http.getAllInPromotion().subscribe(res=>{console.log(res);this.listInPromotion=res});
    //this.http.getAllTrend().subscribe(res=>{console.log(res);this.listTrend=res});
    //this.http.getAllCategories().subscribe(res=>{console.log(res);this.listCategories=res});
    
      
  }

  
  public getAllToolOffers(){
    this.http.getAllToolOffers2(this.pageNumber)
    .pipe(
      map(
        (x:Tool[],i)=> x.map(
          (tool:Tool)=>this.processingImageService.createImage(tool)
        )
      )
    )
    .subscribe(
      (resp:Tool[]) => {
        //console.log(resp);
        this.showLoadButton=resp.length;
        //console.log(resp.length);
        //console.log(this.showLoadButton);
        this.listTools=resp;
        this.filteredTools = resp;
      }
      );
      
    
  }
  
  
  public getAllNewArrival(){
    this.http.getAllNewArrival()
    .pipe(
      map(
        (x:Tool[],i)=> x.map(
          (tool:Tool)=>this.processingImageService.createImage(tool)
        )
      )
    )
    .subscribe(
      (resp:Tool[]) => {
        //console.log(resp);
        this.listNewArrival=resp;
      }
      );
    
  }

  public getAllInPromotion(){
    this.http.getAllInPromotion()
    .pipe(
      map(
        (x:Tool[],i)=> x.map(
          (tool:Tool)=>this.processingImageService.createImage(tool)
        )
      )
    )
    .subscribe(
      (resp:Tool[]) => {
        //console.log(resp);
        this.listInPromotion=resp;
      }
      );
    
  }

  public getAllTrend(){
    this.http.getAllTrend()
    .pipe(
      map(
        (x:Tool[],i)=> x.map(
          (tool:Tool)=>this.processingImageService.createImage(tool)
        )
      )
    )
    .subscribe(
      (resp:Tool[]) => {
        //console.log(resp);
        this.listTrend=resp;
      }
      );
    
  }

  ShowDetails(id:any){
    this.r.navigate(['/user/moreDetails',{id:id}]);
  }


  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllToolOffers();
  }

  loadLessProduct(){
    this.pageNumber= this.pageNumber-1;
    this.getAllToolOffers();
  }
      
  staticCategories: any[] = [
    {
      id:1,
      name:'Air Mattresses & Sleeping Accessories',
      type:"checkbox"
    },
    {
      id:2,
      name:'Backpacking Gear',
      type:"checkbox"
    },
    {
      id:3,
      name:'Camp Kitchen',
      type:"checkbox"
    },
    {
      id:4,
      name:'Camping Furniture',
      type:"checkbox"
    },
    {
      id:5,
      name: 'Camping Lights & Lanterns',
      type:"checkbox"
    },
    {
      id:6,
      name:'Canopies & Shelters',
      type:"checkbox"
    },
    {
      id:7,
      name:'Coolers',
      type:"checkbox"
    },
    {
      id:8,
      name:'Outdoor & Camping Drinkware',
      type:"checkbox"
    },
    {
      id:9,
      name:'Outdoor Clothing',
      type:"checkbox"
    },
    {
      id:10,
      name: 'Outdoor Footwear',
      type:"checkbox"
    },
    {
      id:11,
      name:'Sleeping Bags',
      type:"checkbox"
    },
    {
      id:12,
      name:'Tents',
      type:"checkbox"
    } 
  ]; // Replace with your static categories
  selectedCategories: string[] = [];
  listTools: Tool[] = [];
  filteredTools: Tool[] = [];



  /*updateSelectedCategories(e:any, categoryName: string) {
    if (e.target.checked) {
      console.log(categoryName);

      // If the checkbox is checked, add the category to selectedCategories
      if (!this.selectedCategories.includes(categoryName)) {
        console.log('Selected Categories:', this.selectedCategories);

        this.selectedCategories.push(categoryName);
        console.log('Selected Categories:', this.selectedCategories);
      }
    } else {
      // If the checkbox is unchecked, remove the category from selectedCategories
      this.selectedCategories = this.selectedCategories.filter(
        category => category !== categoryName
      );
    }
  
    // Filter tools based on selected categories
    if (this.selectedCategories.length === 0) {
      this.filteredTools = this.listTools;
    } else {
      this.filteredTools = this.listTools.filter(tool =>
        this.selectedCategories.some(category => tool.categories.includes(category))
      );
    }
  }
*/
  updateSelectedCategories2(e:any, categoryName: string) {
    if (e.target.checked) {
      this.http.getToolOffersByCategory2(this.pageNumber,categoryName)
    .pipe(
      map(
        (x:Tool[],i)=> x.map(
          (tool:Tool)=>this.processingImageService.createImage(tool)
        )
      )
    )
    .subscribe(
      (resp:Tool[]) => {
        //console.log(resp);
        this.showLoadButton=resp.length;
        //console.log(resp.length);
        //console.log(this.showLoadButton);
        this.listTools=resp;
        this.filteredTools = resp;
      }
      );
      
    } else {
      // If the checkbox is unchecked, remove the category from selectedCategories
      this.http.getAllToolOffers2(this.pageNumber)
    .pipe(
      map(
        (x:Tool[],i)=> x.map(
          (tool:Tool)=>this.processingImageService.createImage(tool)
        )
      )
    )
    .subscribe(
      (resp:Tool[]) => {
        //console.log(resp);
        this.showLoadButton=resp.length;
        //console.log(resp.length);
        //console.log(this.showLoadButton);
        this.listTools=resp;
        this.filteredTools = resp;
      }
      );
    }
  
    // Filter tools based on selected categories
    if (this.selectedCategories.length === 0) {
      this.filteredTools = this.listTools;
    } else {
      this.filteredTools = this.listTools.filter(tool =>
        this.selectedCategories.some(category => tool.categories.includes(category))
      );
    }
  }


  

}
