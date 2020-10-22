import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StockService } from '../_services/stock.service';
import { IStock } from './../_model/IStock';

@Component({
  selector: 'app-single-stock',
  templateUrl: './single-stock.component.html',
  styleUrls: ['./single-stock.component.css'],
})
export class SingleStockComponent implements OnInit {
  stock: IStock = {
    margin: 1000,
    past: [0, 0, 0, 0],
    max: 0,
    name: '----',
    min: 0,
    rate: 0,
    uid: '----'
  };

  primaryXAxis: object = {
    valueType: 'Category',
  };

  constructor(
    private router: ActivatedRoute,
    private stockService: StockService,
    private authService: AuthService,
    private accountService: AuthService
  ) {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.stockService.getOneStock(params.get('id')).subscribe((res) => {
        this.stock = res.data() as IStock;
        let start = 20;
        this.data = this.stock.past.map((e) => {
          start -= 5;
          return { x: start + 'min(s) ago', y: e };
        });
      });
    });
  }
  data: object[] = [];
  stockForm: FormGroup;

  disableCheck(): boolean {
    let total = JSON.parse(localStorage.getItem('userData'));
    total = total.total ? total.total : 0;
    const stockprice = (this.stockForm.value.stocks * this.stock.past[3]).toFixed(2);

    return (this.stockForm.value.stocks > 0 && total > 0 && total >= stockprice) ? true : false;
  }

  ngOnInit(): void {
    this.stockForm = new FormGroup({
      stocks: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(
          JSON.parse(localStorage.getItem('userData')).total /
          this.stock.past[3]
        ),
      ]),
    });
  }

  get stockValueGet(): AbstractControl {
    return this.stockForm.get('stocks');
  }

  submitFunc(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const stocksPurchased = this.stockForm.value.stocks;
    const price = this.stock.past[3];
    userData.total = userData.total - stocksPurchased * price;
    let had = false;

    userData.stock.forEach((element, index) => {
      if (element.name === this.stock.name) {
        element.stocksPurchased += stocksPurchased;
        element.price = price;
        userData.stock[index] = element;
        had = true;
      }
    });

    if (!had) {
      userData.stock.push({ stocksPurchased, price, name: this.stock.name });
    }

    this.accountService.editUser(userData)
      .then(() => {
        alert('Payment Complete');
        this.stockForm.reset(this.stockForm.value);
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.setItem('userData', JSON.stringify(userData));
    this.authService.user.next(userData);
  }
}
