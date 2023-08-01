import { FileHandle } from "./file-handle.model"

export interface Tool {
    idToolOffer:number,
    toolName:string,
    description:string,
    brand:string,
    characteristic:string,
    RentPeriod:string,
    barCode:number,
    price:number,
    weight:number,
    typeCart:string
    categories:string
    images: FileHandle[]
} 