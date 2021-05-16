export function login(){
    var result = `query{
        users{
          id,
          name,
          email,
          expirationDate,
          serviceId,
          password,
          role,
          status
        }
      }`;
    return result;
} 