import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeProviderService {

  constructor() { 

  }

  isLessThanXMins(currentDate, lastDate, mins){
    var diff = currentDate - lastDate;
    const minutes = (diff / 60000);
    return minutes <= mins;
  }
}
