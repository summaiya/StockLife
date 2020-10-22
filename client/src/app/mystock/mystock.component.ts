import { IStock } from './../_model/IStock';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StockService } from '../_services/stock.service';

@Component({
  selector: 'app-mystock',
  templateUrl: './mystock.component.html',
  styleUrls: ['./mystock.component.css']
})
export class MystockComponent {
  allStocks: IStock[];
  currentUser: any;
  stocksShow: any[];

  constructor(private StockS: StockService, private Account: AuthService) {
    this.getAll();
  }

  getAll(): void {
    this.StockS.getAllStocks().subscribe(((res) => {
      this.allStocks = [];

      res.forEach(doc => {
        const { name, min, max, margin, past } = doc.data();
        const rate = parseFloat(((past[3] - past[2]) / past[2] * 100).toFixed(2));
        const uid = doc.id;
        this.allStocks.push({ name, min, max, margin, past, rate, uid });
      });

      this.Account.getUser().subscribe(response => {
        this.currentUser = response.data();

        this.stocksShow = this.currentUser.stock.map(result => {
          const { name, stocksPurchased, price } = result;
          const currentPrice = this.allStocks.find(e => e.name === name).past[3];
          const ROI = parseFloat((((currentPrice - price) / price) * 100).toFixed(2));
          const profit = (currentPrice * stocksPurchased - price * stocksPurchased).toFixed(2);

          return { name, stocksPurchased, ROI, profit, currentPrice };
        });
      });
    }));
  }

  sellAll(name: string): void {
    const currentStock = this.stocksShow.find(x => x.name === name);
    this.currentUser.stock.forEach((element, index) => {
      if (element.name === name) {
        this.currentUser.stock.splice(index, 1);
        this.currentUser.total += currentStock.currentPrice * element.stocksPurchased;
      }
    });
    this.Account.editUser(this.currentUser).then(res => {
      alert('Funded');
      this.getAll();
    }).catch(err => console.error(err));
  }

}
