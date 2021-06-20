export function login() {
  var result = `query{
        users{
          id,
          name,
          lastName,
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

export function getUserFriends() {
  var result = `query{
    getUserFriends{
    success
    message
    data{
      name
      email
      createdAt
    }
  }
  }`;
  return result;
}

export function getUserById(id: number) {
  var result = `query{
    getUserById(InputData:{
      idUser:${id}
    }){
      message
      data{
        name,
        lastName,
        email,
        role,
        status
      }
    }
  
  }`;
  return result;
}

export function getCurrentUser() {
  var result = `query{
    getCurrentUser{
    success
    message
    data{
      name
      lastName
      email
      createdAt
      role
      status
    }
  }
}`;
  return result;
}

export function getAllUsers() {
  return `query{
    getAllUsersReport{
      message
      description
      success
      data{
        id,
        name,
        email,
        expirationDate
        password,
        role,
        status,
        createdAt,
        lastName, 
      }
    }
  }`;
}