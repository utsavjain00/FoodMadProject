import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  searchValue:string;
  searchOrNot:boolean=true;

  constructor(private route:ActivatedRoute,private router:Router, private recipeInfo:RecipeService) {

    this.recipeInfo.searchRecipe.subscribe(
      searchRecipe=>{
        console.log("hello");
        this.searchValue= searchRecipe.searchBox;
        console.log(searchRecipe.searchBox);
          this.searchOrNot=!searchRecipe.searchrecipe;
          this.router.navigate(['./searchFood/' +searchRecipe.searchBox],{relativeTo:this.route});
      }
    )
   }

  
  ngOnInit(): void {
   
  }

  onOrderFood()
  {
    
    this.router.navigate(['./orderFood'],{relativeTo:this.route});
  }

  onPreviousOrder()
  {
    this.router.navigate(['./previousOrder'],{relativeTo:this.route});
  }

}
