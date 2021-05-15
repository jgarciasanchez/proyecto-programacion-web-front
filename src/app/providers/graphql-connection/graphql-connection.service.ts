import { Injectable } from '@angular/core';
import { SessiondataService } from '../sessiondata/sessiondata.service';




@Injectable({
  providedIn: 'root'
})
export class GraphqlConnectionService {

  uri = 'http://186.159.231.67:3006/graphQL';

  constructor(private sessiondata: SessiondataService) { 

  }

  async post(query, needsToken:boolean =  false){
    try {
      let headers: any = {'content-type': 'application/json', "Access-Control-Allow-Origin": "*"}
      if(needsToken){
        //const token = await this.sessiondata.getToken();
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwibmFtZSI6IktldmluIiwiZW1haWwiOiJrZW4yMDBnY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMyRLblpWYXJOalZHeG5nOGVyZUU4d0ZPMFZwOFdMbWxqZjloTS9QT2VEUEF3S0Z1OWJVNDF5NiIsImNvZGUiOm51bGwsImV4cGlyYXRpb25EYXRlIjpudWxsLCJyb2xlIjoiTk9ORSIsInNlcnZpY2VJZCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wNC0yNVQyMToxMzozNS41MThaIiwidXBkYXRlQXQiOiIyMDIxLTA0LTI1VDIxOjEzOjM1LjUxOFoiLCJzdGF0dXMiOm51bGx9LCJpYXQiOjE2MjA4ODQ4NjEsImV4cCI6MTYyMDkyMDg2MX0.AdCndlH7ukovXheSM516XeSX3LkJ-3sCBLUvIJ8m5W4";
        if(token){
          headers = {...headers, 'authorization': token }
        }
      }
      
      const response = await fetch(this.uri, {
        headers:headers ,
        method: 'POST',
        body: JSON.stringify({ query }),
      });

      const responseJson = await response.json();
      return responseJson;
    }catch(e){
      return null;
    }
  }


  async get(query){
    try {
      const response = await fetch(this.uri, {
        headers: {'content-type': 'application/json', "Access-Control-Allow-Origin": "*"},
        method: 'GET',
        body: JSON.stringify({ query }),
      });

      const responseJson = await response.json();
      return responseJson;
    }catch(e){
      return null;
    }
  }
}
