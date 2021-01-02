import { Component, ElementRef, OnInit, ViewChildren,QueryList, AfterViewInit,ChangeDetectionStrategy, OnChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeData } from 'src/app/shared/RecipeData';
import { RecipeService } from 'src/app/shared/recipeInfo.service';

@Component({
  selector: 'app-order-food',
  templateUrl: './order-food.component.html',
  styleUrls: ['./order-food.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFoodComponent implements OnInit,AfterViewInit{

  @ViewChildren('hello') hellos: QueryList<ElementRef>;
  @ViewChildren('totalAmount') amounts: QueryList<ElementRef>;
  @ViewChild('amountHeading') amountHeading: ElementRef;
  //@ViewChildren('sumAmount') finalAmount: ElementRef;
  calculateAmount;
  changeTotalAmount:boolean;

  constructor(private recipeInfo:RecipeService) { }
  orderedRecipes:RecipeData[]=[];
  orderNumbers=[2,3,4,5,6,7,8,9,10];
  orderForm:FormGroup;
  orderQuantity:Number=1;

  quantityOrder:Number[]=[];
  orderPresent:boolean;
  
  ngOnInit(): void {
    this.orderedRecipes=[];
    this.changeTotalAmount=false;

    console.log("hello");
   this.orderedRecipes= this.recipeInfo.getOrderedFood();
   console.log(this.orderedRecipes);
   if(this.orderedRecipes.length>0)
   {
     this.orderPresent=true;
   }
  }


  ngAfterViewInit()
  {
    var i=0;


    this.hellos.forEach((hello) => {


      hello.nativeElement.value=1;
      hello.nativeElement.name="paisa"+i;
      console.log(typeof(this.orderQuantity));
      console.log(typeof(parseInt(hello.nativeElement.value)));
      //this.orderQuantity=hello.nativeElement.value;
      i=i+1;
    })

    this.calculateAmount=0;
    
    this.quantityOrder=[];

    this.hellos.forEach((hello) => {


      //hello.nativeElement.value=1;
  
      console.log(hello.nativeElement.value);
      this.orderQuantity=parseInt(hello.nativeElement.value);

      this.quantityOrder.push(this.orderQuantity);
    });
          this.amounts.forEach((totalAmount) => {

          this.calculateAmount+=parseInt(totalAmount.nativeElement.textContent.substring(1));
          console.log(parseInt(totalAmount.nativeElement.textContent.substring(1)));
          console.log(this.calculateAmount);
          this.amountHeading.nativeElement.textContent=this.calculateAmount;
          //this.finalAmount.nativeElement.textContent=this.calculateAmount;
          
        })
      
    

    



    }

  onChangeQuantity(event)
  { 

    
    this.calculateAmount=0;
    
    this.quantityOrder=[];

    this.hellos.forEach((hello) => {


      //hello.nativeElement.value=1;
  
      console.log(hello.nativeElement.value);
      this.orderQuantity=parseInt(hello.nativeElement.value);

      this.quantityOrder.push(this.orderQuantity);
    })
    setTimeout(
      ()=>{

        this.amounts.forEach((totalAmount) => {

          this.calculateAmount+=parseInt(totalAmount.nativeElement.textContent.substring(1));
          console.log(parseInt(totalAmount.nativeElement.textContent.substring(1)));
          console.log(this.calculateAmount);
          this.amountHeading.nativeElement.textContent=this.calculateAmount;
          //this.finalAmount.nativeElement.textContent=this.calculateAmount;
          
        })
      ,100,this.calculateAmount})
  
      }
     


  onDeleteRecipe(recipe,i)
  {
    this.orderedRecipes.splice(i,1);
    this.quantityOrder.splice(i,1);

    this.onChangeQuantity(event);

  }

  onCheckout()
  {
    console.log(this.orderedRecipes);
    console.log(this.quantityOrder);
    console.log(this.calculateAmount);

    this.recipeInfo.saveRecipe(this.orderedRecipes,this.quantityOrder,sessionStorage.getItem("emailId"),this.calculateAmount)
    .subscribe(data=>{
        console.log(data);
    })

  }


  

}
