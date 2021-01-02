import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

import { RecipeData } from 'src/app/shared/RecipeData';
import {RecipeService} from 'src/app/shared/recipeInfo.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  addRecipeForm:FormGroup;
  imagePreview:boolean;
  imagePath:string;
  selectedRecipe:RecipeData;
  recipeList:boolean;


  constructor(private recipeinfo:RecipeService) { }

  ngOnInit(): void {
    console.log("hello");
    this.recipeinfo.recipeSelected.subscribe(
      (recipe)=>{
        this.selectedRecipe=recipe;
      }
    )

    
  }

  onUpdateRecipe()
  {
    this.recipeList=!this.recipeList;
    this.selectedRecipe=null;
  }

 

}
