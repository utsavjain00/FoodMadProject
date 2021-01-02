import { Component, OnInit } from '@angular/core';
import { IndianState } from '../shared/state';
import {WindowService} from '../shared/window.service';
import * as firebase from 'firebase';
import {FormGroup,FormControl,FormsModule,ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms'
import { AuthenticationService } from '../shared/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  stateOfIndia=[];
  securityNumber="";
  userVerified=false;
  count=0;
  flag=0;
  windowRef:any;
  otp:string;
  phoneNumber:string;
  employeeId:number=0;
  loginButtonVisible=true;
  verificationCode:string;
  user:any;
  registrationForm:FormGroup;
  userLoginForm:FormGroup;
  forgetPasswordForm:FormGroup;
  emailError:string='';
  registrationMessage:string='';
  loginErrorMessage:string='';
  userPasswordMessage:string='';
  loginSuccessMessage:string='';
  loginVisible:boolean=true;
  forgetPasswordMessage:string='';
  forgetPasswordError:string='';
  forgetPasswordVisible:boolean;

  constructor(private state:IndianState,private win:WindowService,
              private authenticationUser:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
    /*this.emailError='';
    this.registrationMessage='';
    this.loginSuccessMessage='';
    this.forgetPasswordMessage='';
    this.forgetPasswordError='';
    this.loginVisible=true;
    this.forgetPasswordVisible=true;
    this.loginButtonVisible=true;*/
    if(sessionStorage.getItem("customerName"))
    {
      this.loginVisible=false;
      this.loginButtonVisible=false; 
    }
    this.stateOfIndia=this.state.getStateList();
    console.log(this.stateOfIndia);
    
    //this.windowRef.recaptchaVerifier.render()
    this.registrationForm=new FormGroup({
      'userName':new FormControl(null,Validators.required),
      'emailAddress':new FormControl('',[Validators.required,Validators.email]),
      'mobileNumber':new FormControl(null,[Validators.required,Validators.minLength(10)]),
      'stateList':new FormControl(null,Validators.required),
      'cityName':new FormControl(null,Validators.required),
      'pinCode':new FormControl(null,Validators.required),
      'flatNo':new FormControl(null,Validators.required),
      'userPassword':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'confirmPassword':new FormControl(null,[Validators.required]),

    },{validators:this.passwordMatch.bind(this)});
    this.userLoginForm=new FormGroup({
      'loginUserId':new FormControl(null,[Validators.required,Validators.email]),
      'loginPassword':new FormControl(null,Validators.required)
    });

    this.forgetPasswordForm=new FormGroup({
      'forgetUserId':new FormControl(null,[Validators.required,Validators.email]),
      'forgetLoginPassword':new FormControl(null,Validators.required)
    });

  }
  
  verifyLoginCode(){
    this.windowRef.confirmationResult.confirm(this.verificationCode).
    then(result=>{
      this.user=result.user;
    }).catch(error=>console.log(error, "Incorrect code entered"));
  }
  userVerification()
  {
    this.count=1;
    this.employeeId=1;
    if(this.securityNumber==="FM08091996")
    {
      this.userVerified=true;
    }
    else{
      this.securityNumber="";
    }
  }

  onClose(){
    this.userVerified=false;
    this.securityNumber="";
    this.count=0;
  }

  onRegister()
  {
    console.log(this.registrationForm);
    console.log(this.registrationForm.value.emailAddress);
    this.authenticationUser.verifyEmailAddress(this.registrationForm.value.emailAddress,this.registrationForm.value.mobileNumber)
    .subscribe(response=>{
      if(response)
      {
        this.emailError="Email or Number already registered";
      }
      else{
        this.authenticationUser.registerUser(this.registrationForm,this.employeeId)
    .subscribe(response=>{
      console.log(response);
      this.registrationMessage='Registration Successful';
      this.registrationForm.reset();
    });
      }
      
    })
    /*this.authenticationUser.registerUser(this.registrationForm,this.employeeId)
    .subscribe(response=>{
      console.log(response);
    });*/
    //this.registrationForm.reset();

  }
  passwordMatch(c:FormControl):{mismatchPassword:boolean}
  {
    if(c.get('confirmPassword').value != c.get('userPassword').value)
    {
      return {mismatchPassword:true}
    }
  }
  onReset()
  {
    this.registrationForm.reset();
  }
  onLogin()
  {
    console.log(this.userLoginForm.value.loginUserId);
    console.log(this.userLoginForm.value.loginPassword);
    this.authenticationUser.verifyUserId(this.userLoginForm.value.loginUserId).
    subscribe(response=>{
        if(response)
        {
          console.log(response);
          this.authenticationUser.verifyLoginData(this.userLoginForm.value.loginUserId,this.userLoginForm.value.loginPassword)
    .subscribe(res=>{
       
          console.log(res);
          if(res!=null)
          {
            sessionStorage.setItem("emailId",res['emailAddress']);
            sessionStorage.setItem("accountType",res['accId']);
            sessionStorage.setItem("customerName",res['userName']);
            this.loginSuccessMessage="Login Successful";
            this.loginErrorMessage='';
            this.userPasswordMessage='';
            this.loginVisible=false;
            this.loginButtonVisible=false;

          }
          else{
            this.loginSuccessMessage='';
            this.loginErrorMessage='';
            this.userPasswordMessage='Incorrect Password';
            this.userLoginForm.reset();
            
          }
    })
  }
    else
    {
      this.loginErrorMessage="Email Address not exist";
      this.loginSuccessMessage='';
      this.userPasswordMessage='';
      this.userLoginForm.reset();
      
      
    }  
   
    })
    
    

  }
  
onLoginReset()
{
  this.userLoginForm.reset();
}
onForgetReset()
{

}  
onForget()
{
  this.authenticationUser.verifyUserId(this.forgetPasswordForm.value.forgetUserId)
  .subscribe(response=>{
    if(response)
    {
      this.authenticationUser.changePassword(this.forgetPasswordForm.value.forgetUserId,this.forgetPasswordForm.value.forgetLoginPassword).
      subscribe(res=>{
        if(res)
        {
          this.forgetPasswordMessage="Password successfully changed";
          this.forgetPasswordVisible=false;
          this.forgetPasswordError='';
          this.forgetPasswordForm.reset();
        }
      });
    }
    else{
      this.forgetPasswordError="Email Id does not exist";
      this.forgetPasswordMessage='';
      this.forgetPasswordForm.reset();
    }
  })
}
onLogout()
{
  console.log(sessionStorage.getItem("emailId"));
  console.log(sessionStorage.getItem("accountType"));
  console.log(sessionStorage.getItem("customerName"));
  sessionStorage.removeItem("emailId");
  sessionStorage.removeItem("accountType");
  sessionStorage.removeItem("customerName");
  this.loginButtonVisible=true;
  this.loginVisible=true;
  this.userLoginForm.reset();
  this.loginSuccessMessage='';
}
onOrderFood()
{
  if(sessionStorage.getItem("customerName"))
  {
    if(sessionStorage.getItem("accountType")==="1")
    {
      console.log()
      this.router.navigate(['employee']);
    }
    else{
      this.router.navigate(['customer']);
    }
    
  }
  else{
    alert("Please login to explore Food MAD & order Food");
  }
    
}
  

}
