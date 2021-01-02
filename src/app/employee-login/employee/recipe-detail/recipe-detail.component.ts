import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/recipeInfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe:RecipeData;
  addRecipeForm:FormGroup;
  imagePreview:boolean;
  imagePath:string;
  @Output() selectRecipe=new EventEmitter<any>();
  constructor(private recipeService:RecipeService,private router:Router) { }

  ngOnInit(): void {

    this.addRecipeForm=new FormGroup({
      'recipeName': new FormControl(null,Validators.required),
      'recipePrice': new FormControl(null,Validators.required),
      'recipeUrl': new FormControl(null,Validators.required),
      'recipeDescription':new FormControl(null,Validators.required),
      'recipeAvailable':new FormControl('available',Validators.required),
      'recipeType':new FormControl('food & dishes',Validators.required)
    })
  }

  onReset()
  {
    this.addRecipeForm.reset();
  }

  onUpdateRecipe()
  {

    console.log("hello");
    console.log(this.recipe._id);
    console.log(this.recipe.recipeType);
    this.addRecipeForm.setValue({
        'recipeName':this.recipe.recipeName,
        'recipePrice':this.recipe.recipePrice,
        'recipeDescription':this.recipe.recipeDescription,
        'recipeUrl':this.recipe.recipeUrl,
        'recipeAvailable':this.recipe.recipeAvailable,
        'recipeType':this.recipe.recipeType
    })
   
  }

  onRecipeUpdate()
  {
    this.recipeService.updateRecipe(this.recipe._id,this.addRecipeForm.value)
    .subscribe(response=>{
      
      this.selectRecipe.emit(null);
      
    })
  }

  onPreview()
  {
    this.imagePath=this.addRecipeForm.value.recipeUrl;
    this.imagePreview=!this.imagePreview;
  }

  onDeleteRecipe()
  {
    console.log("hello delete");
    console.log(this.recipe._id);
    this.recipeService.deleteRecipe(this.recipe._id,this.recipe).
    subscribe(
      response=>{
        this.selectRecipe.emit(null);
      }
    )
  }

}
