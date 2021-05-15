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