import { RegisterUserInput } from "./input"

export function registerUser(registerData:RegisterUserInput){
    var result = `mutation{
        registerUser(
          registerUserInputData:{
            name:"${registerData.name}",
            lastName:"${registerData.lastName}",
            email:"${registerData.email}",
            password:"${registerData.password}"
          }
        ){
          success
          message
          description
          code
          data{
            name
            lastName
            email
          }
        } 
      }`;
    return result;
} 