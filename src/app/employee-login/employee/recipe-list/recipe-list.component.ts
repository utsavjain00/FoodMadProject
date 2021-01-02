import { Component, OnInit, Output,EventEmitter, Input, OnChanges } from '@angular/core';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnChanges {

  recipes:RecipeData[]
  addRecipeForm:FormGroup;
  imagePreview:boolean;
  imagePath:string;
  @Input() recipeList:boolean;
  //@Output() recipeWasSelected=new EventEmitter<RecipeData>();
  constructor(private recipeinfo:RecipeService) { }

  ngOnInit(): void {

    this.addRecipeForm=new FormGroup({
      'recipeName': new FormControl(null,Validators.required),
      'recipePrice': new FormControl(null,Validators.required),
      'recipeUrl': new FormControl(null,Validators.required),
      'recipeDescription':new FormControl(null,Validators.required),
      'recipeAvailable':new FormControl('available',Validators.required),
      'foodType':new FormControl('food & dishes',Validators.required),
    })


    console.log("hello");
    this.recipeinfo.getAllRecipe()
    .subscribe(response=>{
      console.log(response);
      this.recipes=response;
    })



    
  }

  ngOnChanges()
  {
  
    console.log("hello");
      this.recipeinfo.getAllRecipe()
    .subscribe(response=>{
      console.log(response);
      this.recipes=response;
    })
    
  }

  onAddRecipe()
  {
    this.recipeinfo.addRecipe(this.addRecipeForm.value).
    subscribe(response=>{
      console.log(response['_id']);
      this.addRecipeForm.reset();
      this.recipeinfo.getAllRecipe()
    .subscribe(res=>{
      console.log(response);
      this.recipes=res;
    })
      
    })
  }

  onPreview()
  {
    this.imagePath=this.addRecipeForm.value.recipeUrl;
    this.imagePreview=!this.imagePreview;
  }
  userVerification()
  {
    console.log("hello");
  }

  

  onReset()
  {
    this.addRecipeForm.reset();
  }

  onUpdateRecipe()
  {
    this.recipeinfo.getAllRecipe()
    .subscribe(response=>{
      console.log(response);
      this.recipes=response;
    })
  }

  /*onRecipeSelected(recipe:RecipeData)
  {
      this.recipeWasSelected.emit(recipe);
  }*/
}
