import { Component, OnInit } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  foodRecipes:RecipeData[]=[];
  desertRecipes:RecipeData[]=[];

  constructor(private recipeInformation:RecipeService) { }

  ngOnInit(): void {

        this.recipeInformation.getAllRecipe().subscribe(
          recipes=>{
            
            for(var i=0;i<recipes.length;i++)
            {
              if(recipes[i].recipeType=="food & dishes")
              {
                
                this.foodRecipes.push(recipes[i]);
              }
              else
              {
                
                this.desertRecipes.push(recipes[i]);
              }
              
            }
          }
        )    
  }

}
