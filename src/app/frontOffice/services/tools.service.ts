import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Tool } from 'src/app/_model/tool.model';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  userUrl="http://localhost:1116/welcamp/toolOffer/";
  userUrl2="http://localhost:1116/welcamp/categoryTools/";
  userUrl3="http://localhost:1116/welcamp/toolOffer/displayImage";
  userUrl4="http://localhost:1116/welcamp/image/displayImages";
  userUrl5="http://localhost:1116/welcamp/commandLine/";
  userUrl6="http://localhost:1116/welcamp/order/";
  userUrl7="http://localhost:1116/welcamp/searchByCategoryTools/";


  constructor(private http:HttpClient) { }

  getAllToolOffers(){
    return this.http.get<Tool[]>(this.userUrl+'displayToolOffers');
  }
  getToolOffersByCategory(pageNumber:any,category:any){
    return this.http.get<Tool[]>(this.userUrl+'searchByCategoryTools?pageNumber='+pageNumber);
  }
  getToolOffersByCategory2(pageNumber:any,category:any){
    return this.http.get<Tool[]>(this.userUrl+'displayToolOffersByCategory'+"/"+category);
  }
  getAllToolOffers2(pageNumber:any){
    return this.http.get<Tool[]>(this.userUrl+'displayToolOffers?pageNumber='+pageNumber);
  }
  public getToolOfferById(id:any):Observable<Tool>{
    return this.http.get<Tool>(this.userUrl+'displayToolOffer/'+id);
  }
  getAllNewArrival(){
    return this.http.get<Tool[]>(this.userUrl+'displayNewArrival');
  }
  getAllInPromotion():Observable<Tool[]>{
    return this.http.get<Tool[]>(this.userUrl+'displayInPromotion');
  }
  getAllTrend():Observable<Tool[]>{
    return this.http.get<Tool[]>(this.userUrl+'displayTrend');
  }
  getAllCategories():Observable<string>{
    return this.http.get<string>(this.userUrl2+'displaycategories');
  }
  getImage(id:number):Observable<Object>{
    return this.http.get(this.userUrl+'displayImage');
  }
  
  addTool(t:FormData){
    return this.http.post<Tool>(this.userUrl+'addNewProduct' , t);
  }
  addToCart(quantity:number,id:any,userId:any){
    return this.http.post(this.userUrl5+"add3/"+id+"/"+quantity+"/"+userId,userId);
  }
  getAllCartItems(userId:any){
    return this.http.get(this.userUrl5+"displayCartItems/"+userId);
  }
  getAllCartItems2(userId:any){
    return this.http.get(this.userUrl5+"displayCartItems2/"+userId);
  }
  deleteFromCart(toolId:any,userId:any){
    return this.http.delete(this.userUrl5+"deleteCartItem"+"/"+toolId+"/"+userId);
  }
  pay(id:any){
    return this.http.post(this.userUrl6+"paymentStripe"+"/"+id,id);
  }
  
}
