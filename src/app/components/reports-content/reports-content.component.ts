import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  isWideScreen$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    // var filter = new Filter();
    var Filter = require('bad-words'), filter = new Filter();
    var newBadWords = ['carepicha', 'playo', 'malparido'];
    filter.addWords(...newBadWords);
    var text = "Don't be an carepicha";
    console.log(filter.clean(text));
    this.loadDataFirstGraph();
    // this.loadDataSecondGraph();
  }

  loadDataSecondGraph() {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 99; i++) {
      xAxisData.push('category' + (i + 1));
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 8) * (i / 5 - 10) + i / 5) * 8);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2', 'bar3'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: 'bar3',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
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