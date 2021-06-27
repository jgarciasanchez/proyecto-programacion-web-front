export function login(email: string,password: string){
    var result = `mutation{
        loginUser(password:"${password}",email:"${email}"){
          token
          data{
            accessToken
          }
          description
          success
          code
        } 
      }`;
    return result;
} 

export function isAuth(){
  var result = `query{
    isAuth{
      success
      message
      code
    }
  }`;
  return result;
} 