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
      serviceId
      description
      title
    }
  }
}`;
  return result;
}

export function reportService(id: number) {
  var result = `mutation{
    reportService(serviceData:
            {
          serviceId:${id}
        }
    ){
      success
      message
    }
  }`;
  return result;
}

export function addReview(id: number, comment: string, rating: number) {
  const idAux = id;
  var result = `mutation{
    addReview(serviceData:{
    serviceId:${id}
    description:"${comment}"
    rating: ${rating}

  }){
    success
    message
    code

  }
}`;
  return result;
}
