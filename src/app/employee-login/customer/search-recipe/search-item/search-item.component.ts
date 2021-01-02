import { Component, OnInit,Input} from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  @Input() foodRecipe:RecipeData;
  constructor(private recipeInfo:RecipeService) { }

  ngOnInit(): void {


  }

  onAddFood(recipe)
  {
      
      this.recipeInfo.addOrder(recipe);

      //this.recipeInfo.recipesOrdered.emit(this.orderedRecipes);
  }




}
