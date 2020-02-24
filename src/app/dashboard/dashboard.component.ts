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
export class DashboardComponent implements AfterViewInit {
  @ViewChild('myChart', null) myChart: ElementRef;

  chart: ECharts.ECharts = null;
  posts: Post[];
  accounts: Account[];


  constructor(private postService: PostService, private accountService: AccountService) { }

  ngAfterViewInit() {
    this.postService.register(psts => {
      this.accountService.register((acc: Account[]) => {
        this.accounts = acc
        this.posts = psts;
        this.chart = ECharts.init(this.myChart.nativeElement, 'dark');
        this.chart.setOption(this.createOptions());
      });
    });
  }

  getBarOptions() {
    return {
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
  }

  getPieOptions() {
    return {
      title: {
        text: 'Jonas',
        subtext: 'tooltip',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: [],
        selected: {}
      },
      series: [
        {
          name: 'serie1',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }


  createOptions() {
    let option = this.getPieOptions();
    let series = this.getSeries();
    option.legend.data = this.getAccounts(series);
    option.series[0].data = series;
    console.log(option);
    return option;
  }

  private getAccounts(series: [{name: string, value: number}]) {
    return series.sort((i, j) => j.value - i.value).map(i => i.name);
  }

  private getSeries(): [{name: string, value:number}] {
    let series: [{name: string, value: number}] = [];
    this.accounts.forEach(acc => {
      let serie = {
        name: acc.name,
        value: this.posts.filter(pst => pst.accountId == acc.id).map(i => i.value).reduce((i, j) => i += j, 0)
      };
      series.push(serie);
    });
    return series;
  }

}
