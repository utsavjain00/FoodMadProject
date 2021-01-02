import { Component, OnInit } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.css']
})
export class PreviousOrderComponent implements OnInit {

  constructor(private recipeInfo:RecipeService) { }
  recipes;
  selectedOrder;

  ngOnInit(): void {

    console.log("hello");
    this.recipeInfo.orderSelected.subscribe(
      (recipe)=>{
        console.log(recipe);
        this.selectedOrder=recipe;
      }
    )
   

  }

}
