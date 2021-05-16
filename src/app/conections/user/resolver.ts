export function login() {
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

