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

    console.log(result);
    return result;
}