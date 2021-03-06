import { IStock } from './../_model/IStock';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../_services/stock.service';
@Component({
  selector: 'app-allstocks',
  templateUrl: './allstocks.component.html',
  styleUrls: ['./allstocks.component.css']
})
export class AllstocksComponent implements OnInit {
  data: IStock[] = [];
  config = {
    max: false,
    min: false,
    rate: false,
    current: false,
  };

  constructor(private StockS: StockService, private route: Router) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(): void {
    this.StockS.getAllStocks().subscribe((res => {
      this.data = [];
      res.forEach(doc => {
        const { name, min, max, margin, past } = doc.data();
        const rate = parseFloat(((past[3] - past[2]) / past[2] * 100).toFixed(2));
        const uid = doc.id;
        this.data.push({ name, min, max, margin, past, rate, uid });
      });
    }));
  }

  sortDown(name: string): void {
    if (name === 'current') {
      this.data.sort((a, b) => b.past[3] - a.past[3]);
    } else {
      this.data.sort((a, b) => b[name] - a[name]);
    }

    this.config[name] = !this.config[name];
  }

  sortUp(name: string): void {
    if (name === 'current') {
      this.data.sort((a, b) => a.past[3] - b.past[3]);
    } else {
      this.data.sort((a, b) => a[name] - b[name]);
    }

    this.config[name] = !this.config[name];
  }

  redirect(id: string): void {
    this.route.navigate([`stocks/${id}`]);
  }

  showCorrectAngleIcon(rate: number): boolean {
    return rate > 0;
  }

}
