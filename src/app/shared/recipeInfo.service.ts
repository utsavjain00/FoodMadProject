import { EventEmitter, Injectable, OnInit, Output } from "@angular/core";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { config } from './config';
import {map} from 'rxjs/operators';
import {Observable, pipe, Subject} from 'rxjs';
import { RecipeData } from './RecipeData';
import{Http,Response} from '@angular/http'
import { Router } from '@angular/router';

@Injectable()

export class RecipeService implements OnInit{

    recipeSelected=new EventEmitter<RecipeData>();
    orderedRecipes:RecipeData[]=[];
    searchRecipe=new Subject<any>();
    recipeList=new EventEmitter<any>();
    orderedRecipesData=new EventEmitter<any>();
    orderSelected=new EventEmitter<any>();

    //recipesOrdered=new EventEmitter<RecipeData[]>();
    
    ngOnInit()
    {

    }
    constructor(private http:Http,router:Router){

    }
    addRecipe(addRecipeForm:any)
    {
        const headers = new HttpHeaders({ 'Access-Control-Allow-Origin':'*'});
        console.log(addRecipeForm.value);
    
        return this.http.post(config.apiurl + 
            'addRecipe', addRecipeForm).pipe(map((response:Response)=><RecipeData>response.json()));
    }

    getAllRecipe()
    {
        return this.http.get(config.apiurl+'getAllRecipe').
        pipe(map((response)=><RecipeData[]>response.json()));
    }

    updateRecipe(_id:any,addRecipeForm:any)
    {
        return this.http.put(config.apiurl + 'updateRecipe/' + _id,addRecipeForm).
        pipe(map((response)=><RecipeData[]>response.json()));
        
    }

    addOrder(recipe)
    {
        this.orderedRecipes.push(recipe);
        
    }

    getOrderedFood()
    {
        return this.orderedRecipes;
    }

    checkRecipe(searchDish)
    {
        return this.http.get(config.apiurl+'searchRecipe/'+searchDish).
        pipe(map((response)=><RecipeData[]>response.json()));
    }


    deleteRecipe(_id:any,recipe:any)
    {
        return this.http.put(config.apiurl+'deleteRecipe/'+_id,recipe).
        pipe(map((response)=><RecipeData[]>response.json()));
    }

    saveRecipe(recipes:any[],quantities:any[],emailAddress,totalAmount:any)
{
    for(var i=0;i<recipes.length;i++)
    {
        recipes[i].quantity=quantities[i]
    }
    console.log(recipes);
    console.log(quantities);
    console.log(totalAmount);

    return this.http.post(config.apiurl + 
        'saveRecipe/'+emailAddress + '/' + totalAmount,recipes).pipe(map((response:Response)=><RecipeData>response.json()));   
}

previousOrder(data)
{
    this.orderedRecipesData.emit(data);
}
    
getOrderedRecipe(emailAddress)
{
    return this.http.get(config.apiurl + 
        'getOrderRecipe/'+emailAddress).pipe(map((response:Response)=><RecipeData>response.json()));   
    
}


    
}