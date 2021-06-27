export function login() {
  return `query{
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
}

export function getUserFriends() {
  return `query{
    getUserFriends{
    success
    message
    data{
      id
      name
      email
      createdAt
    }
  }
  }`;
}

export function getUserById(id: number) {
  return `query{
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
}

export function getCurrentUser() {
  return `query{
    getCurrentUser{
    success
    message
    data{
      name,
      id,
      lastName,
      email,
      createdAt,
      role,
      status,
    }
  }
}`;
}

export function getUserProfile(id) {
  return `query{
    getUserProfile(serviceData:{
      idUser:${id}
    }){
      data{
        name,
        lastName,
        id,
        email,
        serviceId,
        title,
        description,
        reviews{
        description,
        rating,
        createdAt,
        responses{
        description,
        createdAt,
        createdAt,
          }
        }
      }
    }
  }`;
}

export function updateUser(id: number, name: string, lastName: string, password: string) {
  return `mutation{
    updateUser(dataInput:{
      idUser:${id}
      userData:{
        name:"${name}",
        lastName:"${lastName}",
        password:"${password}",
      }
    }){
  
      data{
      name
    }
    }
  }`;
}

export function isFriend(id: number) {
  return `query{
    isFriend(InputData:{
      idUser: ${id}
    }){
      data
    }
  }`;
}

export function deleteFriend(id: number) {
  return `mutation{
          deleteFriend(InputData:{
              idUser:${id}
            }){
              data
            }
          }`;
}

export function addFriend(id: number) {
  return `mutation{
    addUserFriend(InputData:{
    idFriend:${id}
  }){
    success
    message
  }
}`;
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