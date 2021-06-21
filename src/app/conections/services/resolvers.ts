export function getAllServices() {
  var result = `query{
        getAllServices{
            id,
            title,
            description,
            createdAt,
            reportCount,
            createdAt
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

export function getServicesAndUser(keywords: string = null, tag: string = null, dateFile: string = null, onlyFriends: boolean = null) {
  var query = `query{
    getServicesAndUser(serviceData:{`
  if (keywords == null) {
    query = query + `wordFilter:${keywords} \n`;
  } else {
    query = query + `wordFilter:"${keywords}" \n`;
  }
  if (tag == null) {
    query = query + `categoria:${tag} \n`;
  } else {
    query = query + `categoria:"${tag}" \n`;
  }
  return query + `
    dateFilter:${dateFile}
    onlyFriends:${onlyFriends}
    }){
    success
    message
    success
    data{
      name,
      lastName,
      id,
      serviceId,
      description,
      title,
      createdAt,
      images{
        url,
        createdAt,
      }
    }
  }
}`;
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

export function getServiceReviews(id: number) {
  var result = `query{
    getServiceReviews(serviceData:{
    serviceId:${id}
  }){
    success
    message
    success
    data{
      id,
      createdAt,
      description,
      serviceId,
      rating,
      creatorUserId,
      name,
      lastName,
      responses{
        id,
        description,
        createdAt,
      }
    }
  }
}`;
  return result;
}


export function getReportedServices() {
  var result = `query{
    getReportedServices{
    success
    message
    success
    data{
      title
      createdAt
      description
      reportCount
    }
  }
}`;
  return result;
}


export function responseReview(id: number, description: string) {
  var result = `mutation{
    responseReview(responseData:{
      reviewId:${id}
      description:"${description}"
      rating:1
    }){
  message
    }
  
  }`;
  return result;
}