import { Injectable } from '@angular/core';
//import { User } from 'src/constants/connections/user/user';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class SessiondataService {
  public currentUser;
  //public user: User;
  public token: any = '';


  constructor() {
 
  }

  /*
  setData(key, data): Promise<boolean>{
    return new Promise(async (resolve)=>{
      try{
        const response: any = await this.storage.set(key, data);
        resolve(response? true: false);
      }catch(e){
        resolve(false);
      }
    })
  }
*/

/*
  getData(key){
    return new Promise(async (resolve,reject)=>{
      try{
          const response: any = await this.storage.get(key);
          resolve(response);
      }catch(e){
        reject(e);
      }
    })
  }
  */

  /*
  removeData(key) : Promise<boolean>{
    return new Promise(async (resolve)=>{
      try{
        const response: any = await this.storage.remove(key);
        resolve(true);
      }catch(e){
        resolve(false);
      }
    })
  }
  */
 /*
  clearAllData() : Promise<boolean>{
    return new Promise(async (resolve)=>{
      try{
        const response: any = await this.storage.clear();
        resolve(true);
      }catch(e){
        resolve(false);
      }
    })
  }
  */
/*
  setUser(user: User){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  getToken(){
    return new Promise(async (resolve, reject)=>{
      try{
        const response: any = await this.getData('token');
        resolve(response);
      }catch(e){
        reject(null)
      }
    })
  }
  */
}
