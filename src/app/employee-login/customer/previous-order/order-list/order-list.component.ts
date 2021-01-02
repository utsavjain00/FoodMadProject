import { Component, OnInit } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private recipeInfo:RecipeService) { }

  recipes;
  ngOnInit(): void {

    this.recipeInfo.getOrderedRecipe(sessionStorage.getItem("emailId")).subscribe(
      response=>{
        this.recipes=response;
      }
    )
  }

}
