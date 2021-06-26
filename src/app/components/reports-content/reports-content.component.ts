import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from 'src/app/conections/services/response';
import { GetAllUsersReportOutput, User } from 'src/app/conections/user/response';
import { ExportToCsv } from 'export-to-csv';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-reports-content',
  templateUrl: './reports-content.component.html',
  styleUrls: ['./reports-content.component.scss']
})
export class ReportsContentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showFiller = false;
  options: any;
  optionsUpdate: any;
  updateOptions: any;
  theme: string = this._themeService.getCurrentTheme();

  usersCountByDate: number[] = [];
  serviceCountByDate: number[] = [];
  userGroupByDate = new Map();
  serviceGroupByDate = new Map();
  dates: string[] = [];
  allUsers: User[];
  reportedServices: Service[] = [];
  isWideScreen$: Observable<boolean>;
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'reportCount', 'actions'];
  dataSource: MatTableDataSource<Service>;

  constructor(private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private _themeService: ThemeService) { }

  ngOnInit(): void {
    this.loadDataSecondGraph();
  }

  loadDataSecondGraph() {
    const dataGetAllUsersFromAsync = this.route.snapshot.data.allUsers;
    const { getAllUsersReport }: any = dataGetAllUsersFromAsync.data;
    let { success, data }: GetAllUsersReportOutput = getAllUsersReport;
    this.allUsers = data;


    const dataGetAllServicesFromAsync = this.route.snapshot.data.allServices;
    const { getAllServices }: any = dataGetAllServicesFromAsync.data;
    let dataServices: Service[] = getAllServices;

    this.reportedServices = dataServices;

    this.reportedServices.sort(function (a, b) {
      if (a.reportCount < b.reportCount) {
        return 1;
      }
      if (a.reportCount > b.reportCount) {
        return -1;
      }
      return 0;
    });
    this.dataSource = new MatTableDataSource(this.reportedServices);

    try {
      data.forEach(user => {
        var userRegisterDate = parseInt(user.createdAt);
        if (userRegisterDate < 10000000000)
          userRegisterDate *= 1000;
        userRegisterDate = userRegisterDate + (new Date().getTimezoneOffset() * -1);

        var date = new Date(userRegisterDate);
        var newDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        user.createdAt = newDate;

        const key = user.createdAt;
        const collection = this.userGroupByDate.get(key);
        if (!collection) {
          this.userGroupByDate.set(key, [user]);
        } else {
          collection.push(user);
        }
      });

      var keys = this.userGroupByDate.keys();
      this.userGroupByDate.forEach((item) => {
        this.usersCountByDate.push(item.length);
        this.dates.push(keys.next().value);

      })

      dataServices.forEach(service => {
        var serviceRegisterDate = parseInt(service.createdAt);
        if (serviceRegisterDate < 10000000000)
          serviceRegisterDate *= 1000;
        serviceRegisterDate = serviceRegisterDate + (new Date().getTimezoneOffset() * -1);

        var date = new Date(serviceRegisterDate);
        var newDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        service.createdAt = newDate;

        const key = service.createdAt;
        const collection = this.serviceGroupByDate.get(key);
        if (!collection) {
          this.serviceGroupByDate.set(key, [service]);
        } else {
          collection.push(service);
        }
      });

      this.serviceGroupByDate.forEach((item) => {
        this.serviceCountByDate.push(item.length);
      })

    } catch (error) {
      console.log(error);
    }

    this.options = {
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['Usuario', 'Servicios'],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      xAxis: {
        data: this.dates,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
      }, {
        start: 0,
        end: 10
      }],
      series: [
        {
          name: 'Usuario',
          type: 'line',
          data: this.usersCountByDate,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'Servicios',
          type: 'line',
          data: this.serviceCountByDate,
          animationDelay: (idx) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  exportToCSV() {
    const options = {
      fieldSeparator: ',',
      filename: 'users_report',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Users Report',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.allUsers);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}