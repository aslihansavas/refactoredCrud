import { Injectable,inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { API_Config } from "../api.config";
import { ProductResponseModel } from "../Models/Products/ProductResponseModel";
import { CreateProductRequestModel } from "../Models/Products/CreateProductRequestModel";
import { UpdateProductRequestModel } from "../Models/Products/UpdateProductRequestModel";
//tODO:öDEV
@Injectable({providedIn:'root'})
export class ProductApi{
    private http=inject(HttpClient);
    private readonly url=`${API_Config.baseUrl}/${API_Config.endpoints.product}`;

    //Get Lists :
    async getAll():Promise<ProductResponseModel[]>{
        return await lastValueFrom(this.http.get<ProductResponseModel[]>(this.url));
    }

    //Post Create :
    async create(body:CreateProductRequestModel):Promise<string>{
        return await lastValueFrom(this.http.post(this.url,body,{responseType:'text'}));

    }

    //Put Update :
    async update(body:UpdateProductRequestModel):Promise<string>{
        return await lastValueFrom(this.http.put(this.url,body,{responseType:'text'}));
    }

    //Delete
    async deleteByID(id:number):Promise<string>{
        return await lastValueFrom(this.http.delete(this.url,{body:id,responseType:'text'}));
    }
}