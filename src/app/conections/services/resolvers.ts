export function getAllServices() {
  var result = `query{
        getAllServices{
            id,
            title,
            description
          }
      }`;
  return result;
}

export function registerService(title: string, description: string) {
  var result = `mutation{
        registerService(
          serviceData:{
            title:"${title}",
            description:"${description}",
          }
        )
      }`;
  return result;
}

export function getServicesAndUser() {
  var result = `query{
    getServicesAndUser{
    success
    message
    success
    data{
      name
      lastName
      id
      description
      title
    }
  }
}`;
  return result;
}