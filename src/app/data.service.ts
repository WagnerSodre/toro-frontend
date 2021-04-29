import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// class that makes the requests to the backend
export class DataService {

  constructor(private http: HttpClient) { }

  // function that sends a POST request to the backend with a new sensor and creates it
  public login(user: {user, pwd}){
    return this.http.post("http://localhost:8888/api/auth/login", user).pipe(map((resp: any) => resp))
  }

  // function that sends a GET request to the backend and gets all sensors
  public getUserPosition(token){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-access-token': token,
    }
    
    const options = {                                                                                                                                                                                 
      headers: headerDict, 
    };
    return this.http.get("http://localhost:8888/api/userPosition", options);
  }
}
