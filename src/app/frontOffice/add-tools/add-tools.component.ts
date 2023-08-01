import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/_model/tool.model';
import {NgForm} from '@angular/forms';
import { ToolsService } from '../services/tools.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/_model/file-handle.model';

@Component({
  selector: 'app-add-tools',
  templateUrl: './add-tools.component.html',
  styleUrls: ['./add-tools.component.css']
})
export class AddToolsComponent implements OnInit {

  tool:Tool={
    idToolOffer:0,
    toolName:"",
    description:"",
    brand:"",
    characteristic:"",
    RentPeriod:"",
    barCode:0,
    price:0,
    weight:0,
    typeCart:"SALE",
    categories:"",
    images: []

  }

  constructor(private http:ToolsService ,private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    
  }
  addTool(toolForm : NgForm){
    const toolFormData = this.prepareFormData(this.tool);
    toolForm.reset();
        this.tool.images=[];
    this.http.addTool(toolFormData).subscribe(
      (res:Tool)=>{
        
        console.log(res);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
    console.log(this.tool);
  }

  prepareFormData(tool:Tool): FormData{
    const formData =new FormData();
    formData.append(
      'toolOffer',
      new Blob([JSON.stringify(tool)],{type: 'application/json'})
    );

    for (var i= 0;i<tool.images.length;i++){
      formData.append(
        'file', 
        tool.images[i].file,
        tool.images[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event:any){
    if(event.target.files){
      const file=event.target.files[0];
      const fileHandle:FileHandle ={
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.tool.images.push(fileHandle);
    }
  }
  removeImages(i:number){
    this.tool.images.splice(i,1);
  }
  fileDropped(fileHandle:FileHandle){
    this.tool.images.push(fileHandle);
  }

}
