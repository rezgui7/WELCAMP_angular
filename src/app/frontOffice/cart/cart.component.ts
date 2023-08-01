import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessingImageService } from '../services/processing-image.service';
import { map } from 'rxjs';
import { Tool } from 'src/app/_model/tool.model';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  toolDetail:any;
  listTools:any;
  listTool:any;
  

  constructor(private route: ActivatedRoute,
    private http:ToolsService,
    private r:Router,
    private processingImageService:ProcessingImageService,
    private cookieService: CookieService,
    private location: Location){}


  ngOnInit(): void {
     this.http.getAllCartItems(1).subscribe(res=>{console.log(Object.keys(res));
      console.log(res);this.toolDetail=res});
      this.http.getAllCartItems2(1).subscribe(res=>{console.log(Object.keys(res));
        console.log(res);this.listTools=res});
      this.getAllToolOffers();
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
          this.listTool=resp;
        }
        );
        
      
    }

    public delete(idTool:any){
      this.http.deleteFromCart(idTool,1).subscribe(()=>alert('deleted'));
      this.location.replaceState('/user/cart');
      location.reload();
    }

    public pay(){
      this.http.pay(1).subscribe(()=>('succes'));
    }

}
