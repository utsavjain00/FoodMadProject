import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipeInfo.service';
import { RecipeData } from 'src/app/shared/RecipeData';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {

  searchDish:string;
  searchedRecipe:RecipeData[]=[];
  

  constructor(private recipeInfo:RecipeService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    //console.log("hello Search");
    this.route.params.
    subscribe(
      (params:Params)=>{
        this.searchDish=params['recipeName'];
        this.recipeInfo.checkRecipe(this.searchDish).subscribe(
          recipe=>{
              this.searchedRecipe=recipe;
          }
        )
      }
    )
    
    
  }

}
