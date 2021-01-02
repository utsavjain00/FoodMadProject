import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { IndianState } from './shared/state';
import { WindowService } from './shared/window.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import {HttpClientModule} from '@angular/common/http'
import {auth} from 'firebase';
import { AuthenticationService } from './shared/authentication.service';
import {HttpModule,Http} from '@angular/http';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { Routes,RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee-login/employee/employee.component';
import { CustomerComponent } from './employee-login/customer/customer.component';
import { RecipeService } from './shared/recipeInfo.service';
import { RecipeDetailComponent } from './employee-login/employee/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './employee-login/employee/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './employee-login/employee/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './employee-login/employee/recipe-start/recipe-start.component';
import { RecentlyAddedComponent } from './employee-login/customer/recently-added/recently-added.component';
import { AddedItemComponent } from './employee-login/customer/recently-added/added-item/added-item.component';
import { OrderFoodComponent } from './employee-login/customer/order-food/order-food.component';
import { SearchRecipeComponent } from './employee-login/customer/search-recipe/search-recipe.component';
import { SearchItemComponent } from './employee-login/customer/search-recipe/search-item/search-item.component';
import { PreviousOrderComponent } from './employee-login/customer/previous-order/previous-order.component';
import { OrderListComponent } from './employee-login/customer/previous-order/order-list/order-list.component';
import { OrderDetailComponent } from './employee-login/customer/previous-order/order-detail/order-detail.component';
import { OrderItemComponent } from './employee-login/customer/previous-order/order-list/order-item/order-item.component';


const appRoutes:Routes=[
  {path:'',component:HeaderComponent},
  {path:'employeeLogin',component:EmployeeLoginComponent},
  {path:'employee',component:EmployeeComponent,children:[
    //{path:'',component:RecipeStartComponent},
    {path:'recipe/:id',component:RecipeDetailComponent}
  ]},
  {path:'customer',component:CustomerComponent,children:[
    {path:'searchFood/:recipeName',component:SearchRecipeComponent}
  ]},
  {path:'customer/orderFood',component:OrderFoodComponent},
  {path:'customer/previousOrder',component:PreviousOrderComponent,children:[
    {path :'order/:id',component:OrderDetailComponent}
  ]}
  
  
 
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddMenuComponent,
    EmployeeLoginComponent,
    EmployeeComponent,
    CustomerComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecentlyAddedComponent,
    AddedItemComponent,
    OrderFoodComponent,
    SearchRecipeComponent,
    SearchItemComponent,
    PreviousOrderComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderItemComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes) 
   
  ],
  providers: [IndianState, WindowService,AuthenticationService,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
