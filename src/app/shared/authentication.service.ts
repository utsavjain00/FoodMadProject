import { Injectable, OnInit } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { config } from './config';
import {UserData} from './userData';
//import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Observable, pipe} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {Headers,Http,Response} from '@angular/http';
import { User } from 'firebase';
import { EmailValidator } from '@angular/forms';


@Injectable()

export class AuthenticationService implements OnInit{

    

    ngOnInit(){

    }
    constructor(private http:Http){

    }

    registerUser(registrationForm:any,accId:number):Observable<UserData[]>
    {
        let headers=new Headers();
        console.log(registrationForm.value.userName);
        console.log(accId);
        return this.http.get(config.apiurl + 'registerUser/'+accId + '/' + registrationForm.value.userName+'/' +registrationForm.value.cityName+ '/' +registrationForm.value.emailAddress+'/' +registrationForm.value.flatNo+'/'+registrationForm.value.mobileNumber+'/'+ registrationForm.value.pinCode+'/'+registrationForm.value.stateList+'/'+registrationForm.value.userPassword).
        pipe(map((response:Response)=> <UserData[]>response.json()));
        
    }
    verifyEmailAddress(emailAddress,mobileNumber):Observable<UserData[]>
    {
        let headers=new Headers();
        console.log(emailAddress);
        
        return this.http.get(config.apiurl + 'verifyEmailAddress/'+emailAddress +'/' +mobileNumber).
        pipe(map((response:Response)=> <UserData[]>response.json()));
        
    }

    verifyLoginData(emailAddress,userPassword):Observable<UserData[]>
    {
        return this.http.get(config.apiurl+'verifyUserData/'+ emailAddress +'/'+userPassword).
        pipe(map((responsedata:Response)=><UserData[]>responsedata.json()));
            
       
    }
    verifyUserId(emailAddress):Observable<UserData[]>
    {
        console.log(emailAddress);
        return this.http.get(config.apiurl+'verifyUserId/'+ emailAddress).
        pipe(map((response:Response)=> <UserData[]>response.json()));
    }
    changePassword(emailAddress,userPassword)
    {
           
        console.log(emailAddress);
        console.log(userPassword);
        return this.http.get(config.apiurl+'changePassword/'+ emailAddress +'/'+userPassword).
        pipe(map((response:Response)=> <UserData[]>response.json()));

    }

    getUser(emailId)
    {
        return this.http.get(config.apiurl+'getAccount/'+emailId).
        pipe(map((response:Response)=> <UserData[]>response.json()));

    }

    updateUser(emailAddress,userForm,accountType)

    {
        console.log(userForm);
        return this.http.put(config.apiurl+'updateUser/'+emailAddress +'/'+accountType,userForm).
        pipe(map((response:Response)=> <UserData[]>response.json()));
    }
    


    
}