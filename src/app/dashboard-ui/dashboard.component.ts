import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as ECharts from 'echarts';
import { PostService } from '../core/services/post.service';
import { Post } from '../core/model/post';
import { Account } from '../core/model/account';
import { AccountService } from '../core/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
      <div #myChart style="width: 100%;"></div>
  `,
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('myChart')
  myChart: ElementRef;

  chart: ECharts.ECharts = null;
  posts: Post[];
  accounts: Account[];

  height = '600px';
  accountSubsription$: Subscription;
  postSubscription$: Subscription;

  constructor(
    private postService: PostService,
    private accountService: AccountService,
    private route: ActivatedRoute) {
    route.queryParamMap.subscribe(params => {
      if (params.has('height')) {
        this.height = params.get('height');
      }
    });
  }

  ngAfterViewInit() {
    this.myChart.nativeElement.style.height = this.height;
    this.chart = ECharts.init(this.myChart.nativeElement, 'dark');
    this.accountSubsription$ = this.accountService.register(accounts => {
      this.accounts = accounts;
      if (!!this.accounts && !!this.posts) {
        this.chart.setOption(this.createOptions());
      }
    });
    this.postSubscription$ = this.postService.register(posts => {
      this.posts = posts;
      if (!!this.accounts && !!this.posts) {
        this.chart.setOption(this.createOptions());
      }
    });
  }
  
  ngOnDestroy(): void {
    this.accountSubsription$.unsubscribe;
    this.postSubscription$.unsubscribe;
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
        text: 'Total',
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

  createOptions(): any {
    let option = this.getPieOptions();
    let series = this.getSeries();
    option.legend.data = this.getAccounts(series);
    option.series[0].data = series;
    return option;
  }

  private getAccounts(series: { "name": string, "value": number }[]) {
    return series.sort((i, j) => j.value - i.value).map(i => i.name);
  }

  private getSeries(): { "name": string, "value": number }[] {
    let series: { "name": string, "value": number }[] = [];
    this.accounts.forEach(acc => {
      let serie = {
        "name": acc.name,
        "value": this.posts.filter(pst => pst.accountId == acc.id).map(i => i.value).reduce((i, j) => i += j, 0)
      };
      series.push(serie);
    });
    return series;
  }

}
