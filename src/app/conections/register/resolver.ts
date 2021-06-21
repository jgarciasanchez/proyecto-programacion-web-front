import { RegisterUserInput } from "./input"

export function registerUser(registerData: RegisterUserInput, tags: string[]) {
  console.log(tags);
  var auxTags: { tag: string }[] = [];
  tags.forEach(tagToPush => {
    auxTags.push({ tag: tagToPush })
  });

  var result = `mutation{
        registerUser(
          registerUserInputData:{
            name:"${registerData.name}",,
            lastName:"${registerData.lastName}",,
            email:"${registerData.email}",,
            password:"${registerData.password}",
            likesList:[`;
  auxTags.forEach(tag => {
    result += `{tag:"` + tag.tag + `"}`, tag;
  });
  result += `]}
        ){
          success
          message
          description
          code
          data{
            name
            lastName
            email
          }
        } 
      }
      
      
      
      `;
  return result;
}