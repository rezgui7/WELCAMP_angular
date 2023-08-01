import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../services/tools.service';
import { NgForm } from '@angular/forms';
import { Promotion } from 'src/app/_model/promotionModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Tool } from 'src/app/_model/tool.model';
import { ProcessingImageService } from 'src/app/frontOffice/services/processing-image.service';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  tool:any ;
  promotion:Promotion={
    id:0,
    promotionCode:11111,
    amount:0,
    expires:new Date()
  }
  listTools: any;



  constructor(private route: ActivatedRoute,
    private http:ToolsService,
    private r:Router,
    private processingImageService :ProcessingImageService
    ){}
  ngOnInit(): void {
    this.tool = this.route.snapshot.params;
    console.log(this.route.snapshot.data);
    console.log(this.tool.id)

  }
  addPromotion(promoForm : NgForm){

    const promotion = new Promotion();
    promotion.promotionCode = promoForm.value.promotionCode;
    promotion.amount = parseFloat(promoForm.value.amount);
    promotion.expires = promoForm.value.expirationDate ;
    console.log(promotion);
    this.http.addPromo(this.tool.id,promotion).subscribe(
      (resp)=>{
        promoForm.reset();
        console.log(resp);
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

}
