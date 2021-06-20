import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GetReportedServicesOutput, Service } from 'src/app/conections/services/response';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-service-reports-control',
  templateUrl: './service-reports-control.component.html',
  styleUrls: ['./service-reports-control.component.css']
})
export class ServiceReportsControlComponent implements OnInit {
  reportedServices: Service[] = [];
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'reportCount', 'actions'];
  dataSource: MatTableDataSource<Service>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.loadDataFromResolvers();
  }

  loadDataFromResolvers() {
    const dataGetServiceFromAsync = this.route.snapshot.data.reportedServices;
    const { getReportedServices }: any = dataGetServiceFromAsync.data;
    let { success, data }: GetReportedServicesOutput = getReportedServices;

    if (success) {
      this.reportedServices = data;

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



    } else {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Hubo un problema con la carga de servicios', type: 1 },
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
