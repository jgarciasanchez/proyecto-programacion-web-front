import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GraphqlConnectionService {

  uri = 'http://152.231.166.95:3006/graphQL';

  constructor(private authService: AuthService, private http: HttpClient) {

  }

  postHttp(query, needsToken: boolean = false): Observable<any> {
    try {
      let headers: any = { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" };
      if (needsToken) {
        const token = "Bearer " + this.authService.getToken();
        if (token) {
          headers = { ...headers, 'authorization': token };
        }
      }
      return this.http.post<any>(this.uri, JSON.stringify({ query }), {headers: headers});
    } catch (error) {
      console.log(error);
    }
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
