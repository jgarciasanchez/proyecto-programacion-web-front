import { Injectable } from '@angular/core';
import { SessiondataService } from '../sessiondata/sessiondata.service';
import { AuthService } from 'src/app/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class GraphqlConnectionService {

  uri = 'http://186.159.231.67:3006/graphQL';

  constructor(private sessiondata: SessiondataService, private authService: AuthService) {

  }

  async post(query, needsToken: boolean = false) {
    try {
      let headers: any = { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" }
      if (needsToken) {
        const token = "Bearer " + this.authService.getToken();;
        if (token) {
          headers = { ...headers, 'authorization': token }
        }
      }

      const response = await fetch(this.uri, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ query }),
      });

      const responseJson = await response.json();
      return responseJson;
    } catch (e) {
      return null;
    }
  }


  async get(query) {
    try {
      const response = await fetch(this.uri, {
        headers: { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" },
        method: 'GET',
        body: JSON.stringify({ query }),
      });

      const responseJson = await response.json();
      return responseJson;
    } catch (e) {
      return null;
    }
  }
}
