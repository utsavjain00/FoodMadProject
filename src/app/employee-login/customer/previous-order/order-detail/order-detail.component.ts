import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() recipe;
  
  imagePreview:boolean;
  imagePath:string;
  
  constructor(private recipeService:RecipeService,private router:Router) { }

  ngOnInit(): void {

    console.log(this.recipe);
  }

  onPreview()
  {
    
  }
  onDeleteRecipe()
  {

  }

}
