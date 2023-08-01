import { Tool } from "./tool.model";

export interface Cart{
     empty:boolean;
     totalPrice:number;
     toolsQuantity:number;
     tool:Tool[]
}