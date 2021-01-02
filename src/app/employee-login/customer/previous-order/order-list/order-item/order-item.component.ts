import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() recipe:any;
  @Input() index:number;
  @Output() recipeSelected=new EventEmitter<void>();

  constructor(private recipeInfo:RecipeService) { }

  ngOnInit(): void {
    console.log(this.recipe);
    console.log(this.index);
  }

  onSelected()
  {
    console.log(this.recipe);
    this.recipeInfo.orderSelected.emit(this.recipe);
  }
}
