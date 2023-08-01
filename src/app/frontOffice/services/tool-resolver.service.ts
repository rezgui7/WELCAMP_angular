import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Tool } from 'src/app/_model/tool.model';
import { ToolsService } from './tools.service';
import { ProcessingImageService } from './processing-image.service';

@Injectable({
  providedIn: 'root'
})
export class ToolResolverService implements Resolve<Tool>{

  constructor(private http: ToolsService,
    private imageProcessing:ProcessingImageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tool>  {
    const id = route.paramMap.get('id');
    console.log(id);
    if(id){
      console.log(id)
      return this.http.getToolOfferById(id)
      .pipe(
        map(p=>this.imageProcessing.createImage(p))
      );
    }
    else{
      return of(this.getProductDetails());
    }
    
    
    
  }


  getProductDetails(){
    return{
    idToolOffer:0,
    toolName:"null",
    description:"string",
    brand:"string",
    characteristic:"string",
    RentPeriod:"string",
    barCode:0,
    price:0,
    weight:0,
    typeCart:"string",
    categories:"string",
    images: [],
    }
  }
}
