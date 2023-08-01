import { Injectable } from '@angular/core';
import { ToolsOffersComponent } from '../tools-offers/tools-offers.component';
import { Tool } from 'src/app/_model/tool.model';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProcessingImageService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImage(toolOffer:Tool){
    const toolImage: any[] =toolOffer.images;
    console.log(toolOffer);
    const productImagesToFileHandle: FileHandle[]=[];
    for (let i = 0; i < toolImage.length; i++) {
      const imageFileData = toolImage[i];
      const imageBlob=this.dataURIToBlob(imageFileData.imageData,imageFileData.type);
      const imageFile=new File([imageBlob],imageFileData.name,{type : imageFileData.type});
      const finalFileHandle : FileHandle={
        file : imageFile,
        url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      
      productImagesToFileHandle.push(finalFileHandle);
    
    }
    toolOffer.images=productImagesToFileHandle;
    return toolOffer;
  }
  

  public dataURIToBlob(picByte:any,imageType:any){
    const byteString=window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for(let i = 0 ; i<byteString.length;i++){
      int8Array[i]=byteString.charCodeAt(i);

    }
    const blob = new Blob([int8Array],{type:imageType});
    return blob;
  }
}
