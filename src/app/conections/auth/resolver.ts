export function login(email: string,password: string){
    var result = `mutation{
        loginUser(password:"${password}",email:"${email}"){
          token
          data{
            accessToken
          }
          description
          success
        } 
      }`;
    return result;
} 