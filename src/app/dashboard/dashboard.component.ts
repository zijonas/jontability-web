import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as ECharts from 'echarts';
import { PostService } from '../services/post.service';
import { Post } from '../post/entities/post';
import { Account } from '../account/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-dashboard',
  template: `
      <div #myChart style="width: 100%;height:600px;"></div>
  `,
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild('myChart', null) myChart: ElementRef;

  chart: ECharts.ECharts;
  posts: Post[];
  accounts: Account[];


  constructor(private postService: PostService, private accountService: AccountService) { }

  ngOnInit() {
    this.postService.register(psts => {
      this.posts = psts;
      this.chart.setOption(this.createOptions());
    });
    this.accountService.register(acc => {
      this.accounts = acc
    });
  }

  ngAfterViewInit() {
    this.chart = ECharts.init(this.myChart.nativeElement, 'dark');
  }

  createOptions() {
    let option = {
      title: {
        text: 'Saldo por mês'
      },
      tooltip: {},
      legend: {
        data: []
      },
      xAxis: {
        data: []
      },
      yAxis: {},
      series: []
    };
    option.legend.data = this.getAccounts();
    option.series = this.getSeries();
    console.log(option);
    return option;
  }

  private getAccounts() {
    return this.accounts.map(i => i.name);
  }

  private getSeries() {
    let series = [];
    this.accounts.forEach(acc => {
      let serie = {
        name: acc.name,
        type: 'bar',
        data: [this.posts.filter(pst => pst.accountId == acc.id).map(i => i.value).reduce((i, j) => i += j, 0)]
      };
      series.push(serie);
    });
    return series;
  }

}
