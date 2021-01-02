import { Component, Input, OnInit } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-added-item',
  templateUrl: './added-item.component.html',
  styleUrls: ['./added-item.component.css']
})
export class AddedItemComponent implements OnInit {

  @Input() foodRecipe:RecipeData;
  @Input() desertRecipe:RecipeData;
  constructor(private recipeInfo:RecipeService) { }

  ngOnInit(): void {


  }

  onAddFood(recipe)
  {
      
      this.recipeInfo.addOrder(recipe);

      //this.recipeInfo.recipesOrdered.emit(this.orderedRecipes);
  }



}
