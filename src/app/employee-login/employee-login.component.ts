import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { RecipeService } from '../shared/recipeInfo.service';
import { IndianState } from '../shared/state';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  customerName:string='';
  accountType:string;
  emailId:string;
  searchrecipe:boolean;
  searchBox:string;
  changePasswordForm:FormGroup;
  passwordError:boolean=true;
  updateAccountForm:FormGroup;
  stateOfIndia=[];
  updateVisible=true;
  @Input() searchBoxVisible:boolean=true;

  constructor(private route:ActivatedRoute,private router:Router,private recipeInfo:RecipeService,private authenticateUser:AuthenticationService,private state:IndianState) { }

  ngOnInit(): void {

    this.stateOfIndia=this.state.getStateList()
    this.accountType=sessionStorage.getItem("accountType");
    console.log(this.accountType);
    

    this.customerName=sessionStorage.getItem("customerName");

    this.emailId=sessionStorage.getItem("emailId");

    this.changePasswordForm=new FormGroup({
      'forgetUserId':new FormControl(null,Validators.required),
      'changeLoginPassword':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'changeConfirmPassword':new FormControl(null,Validators.required)
    },
    {validators:this.passwordMatch.bind(this)});



    //Update Account Form
    this.updateAccountForm=new FormGroup({
      'userName':new FormControl(null,Validators.required),
      'emailAddress':new FormControl('',[Validators.required,Validators.email]),
      'mobileNumber':new FormControl(null,[Validators.required,Validators.minLength(10)]),
      'stateList':new FormControl(null,Validators.required),
      'cityName':new FormControl(null,Validators.required),
      'pinCode':new FormControl(null,Validators.required),
      'flatNo':new FormControl(null,Validators.required),
      'userPassword':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'confirmPassword':new FormControl(null,[Validators.required]),

    })


    
    
  }

  passwordMatch(c:FormControl):{mismatchPassword:boolean}
  {
    if(c.get('changeConfirmPassword').value != c.get('changeLoginPassword').value)
    {
      return {mismatchPassword:true}
    }
  }
  onSearch()
  {
    var searchObject={
      searchrecipe:true,
      searchBox:this.searchBox
    }
    
    this.recipeInfo.searchRecipe.next(searchObject);
  }

  onLogout()
  {

  console.log(sessionStorage.getItem("emailId"));
  console.log(sessionStorage.getItem("accountType"));
  console.log(sessionStorage.getItem("customerName"));
  sessionStorage.removeItem("emailId");
  sessionStorage.removeItem("accountType");
  sessionStorage.removeItem("customerName");

  this.router.navigate(['']);
  }

  onReset()
  {
    this.changePasswordForm.reset();
  }

  onChangePassword()
  {

    console.log(this.emailId);
    this.changePasswordForm.setValue({
      'forgetUserId': this.emailId,
      'changeLoginPassword':'',
      'changeConfirmPassword':''
    })
  }

  changePassword()
  {
      this.authenticateUser.changePassword(this.emailId,this.changePasswordForm.value.changeLoginPassword).
      subscribe(response=>{
            console.log(response);
            this.passwordError=false;
      })
  }

  updateAccount()
  {
    this.authenticateUser.getUser(this.emailId)
    .subscribe(
      response=>{
        console.log(response);
        this.updateAccountForm.setValue({
          'userName':response['userName'],
          'emailAddress':response['emailAddress'],
          'mobileNumber':response['mobileNumber'],
          'stateList':response['stateList'],
          'cityName':response['cityName'],
          'flatNo':response['flatNo'],
          'pinCode':response['pinCode'],
          'userPassword':response['userPassword'],
          'confirmPassword':response['userPassword']
        })
      }
    )
  }

onUpdateAccount()
{
  this.authenticateUser.updateUser(this.emailId,this.updateAccountForm.value,this.accountType)
  .subscribe(user=>{
    console.log(user);
    this.updateVisible=false;
  }

  )
}

onClose()
{
  this.updateVisible=true;
}

onHome()

{
  this.router.navigate(['../customer']);
}

}