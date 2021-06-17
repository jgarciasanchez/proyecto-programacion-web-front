import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllUsersReportOutput } from 'src/app/conections/user/response';

@Component({
  selector: 'app-reports-content',
  templateUrl: './reports-content.component.html',
  styleUrls: ['./reports-content.component.css']
})
export class ReportsContentComponent implements OnInit {
  showFiller = false;
  options: any;
  optionsUpdate: any;
  updateOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value: number;
  private data: any[];
  private timer: any;
  usersCountByDate: number[] = [];
  userGroups = new Map();
  dates: string[] = [];
  isWideScreen$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // // var filter = new Filter();
    // var Filter = require('bad-words'), filter = new Filter();
    // var newBadWords = ['carepicha', 'playo', 'malparido'];
    // filter.addWords(...newBadWords);
    // var text = "Don't be an carepicha";
    // console.log(filter.clean(text));
    // this.loadDataFirstGraph();
    this.loadDataSecondGraph();
  }

  loadDataSecondGraph() {
    const dataGetServiceFromAsync = this.route.snapshot.data.allUsers;

    const { getAllUsersReport }: any = dataGetServiceFromAsync.data;
    let { success, data }: GetAllUsersReportOutput = getAllUsersReport;
    try {
      data.forEach(user => {
        var aux = parseInt(user.createdAt);
        if (aux < 10000000000)
          aux *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
        aux = aux + (new Date().getTimezoneOffset() * -1); //for timeZone   
             
        var date = new Date (aux);
        var newDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        user.createdAt = newDate;
      });
      data.forEach((item) => {
        const key = item.createdAt;
        const collection = this.userGroups.get(key);
        if (!collection) {
          this.userGroups.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      var keys = this.userGroups.keys();
      this.userGroups.forEach((item) => {
        this.usersCountByDate.push(item.length);
        this.dates.push(keys.next().value);
      })
    } catch (error) {
      console.log(error);
    }

    this.options = {
      legend: {
        data: ['Usuario'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.dates,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Usuario',
          type: 'bar',
          data: this.usersCountByDate,
          animationDelay: (idx) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  loadDataFirstGraph() {

    this.data = [];
    this.now = new Date(1997, 1, 1);
    this.value = Math.random() * 1000;

    this.isWideScreen$ = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .pipe(map(({ matches }) => matches));
    console.log(this.isWideScreen$);

    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }

    this.optionsUpdate = {
      title: {
        text: 'Dynamic Data + Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          params = params[0];
          const date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.data
      }]
    };

    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData() {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }
}