import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
// import 'rxjs/add/operator/takeWhile';

@Injectable({
  providedIn: 'root'
})
export class TimerappService {
  timer = 60;
  intervalTime = 1000;
  currentTime = 0;
  numbers = interval(1000);
  isAvailable = true;
  constructor() { }

  iniTimer(timer){
    return Observable.create(observer => {
      const takeFourNumbers = this.numbers.pipe(take((timer + 1)));
      takeFourNumbers.pipe(takeWhile(() => this.isAvailable))//takeWhile(() => this.isAvailable)
      .subscribe(x => {
        this.currentTime = x;
        observer.next(x);
        if((timer) === x){
          observer.complete();
        }
      })
    })
  }

  getTime(){
    return this.currentTime;
  }

  setTime(time){
    this.currentTime = time;
  }

  setAvailable(isAvailable){
    this.isAvailable = isAvailable;
  }

  getAvaiable(){
    return this.isAvailable;
  }
}
