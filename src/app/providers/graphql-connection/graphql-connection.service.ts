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
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNywibmFtZSI6IkpvaGFuIEdhcmNpYSIsImxhc3ROYW1lIjoidGVzdCIsImVtYWlsIjoiam9oYW5wejk4NTBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTMkLzRCRXcwbkN2NFN4OC56MjVQaWdoZTJDZnBiSi8xTFg0V1dIcm1FUUVua2NPcmxmLm56c2EiLCJjb2RlIjoiMzM4MiIsImV4cGlyYXRpb25EYXRlIjoiMTYyMTEwMjIxNyIsInJvbGUiOiJOT05FIiwic2VydmljZUlkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTE1VDE4OjAwOjE4LjA5MVoiLCJ1cGRhdGVBdCI6IjIwMjEtMDUtMTVUMTg6MDA6MTguMDkxWiIsInN0YXR1cyI6IlVOVkVSSUZJRUQifSwiaWF0IjoxNjIxMTMwNzg5LCJleHAiOjE2MjExNjY3ODl9.P1W4UyWFGPDYFqp6B-V656QGaPvYoW0d2k6cL7oG86E";
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
