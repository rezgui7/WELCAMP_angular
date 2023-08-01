import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from 'src/app/_model/promotionModel';
import { Tool } from 'src/app/_model/tool.model';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  userUrl="http://localhost:1116/welcamp/toolOffer/";
  userUrl2="http://localhost:1116/welcamp/promotion/";

  constructor(private http:HttpClient) { }
  getAllToolOffers2(){
    return this.http.get<Tool[]>(this.userUrl+'displayToolOffers2');
  }
  addPromo(id:any,promotion:Promotion){
    return this.http.put<Promotion>(this.userUrl2+'ApplyPromotion/'+id , promotion);
  }
}
