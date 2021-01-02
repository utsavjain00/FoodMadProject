import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:RecipeData;
  @Input() index:number;
  @Output() recipeSelected=new EventEmitter<void>();
  constructor(private recipeInfo:RecipeService) { }

  ngOnInit(): void {

    console.log(this.recipe);
  }

  onSelected()
  {
    this.recipeInfo.orderSelected.emit(this.recipe);
  }

}
