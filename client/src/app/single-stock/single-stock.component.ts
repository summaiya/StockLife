import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StockService } from '../_services/stock.service';

@Component({
  selector: 'app-single-stock',
  templateUrl: './single-stock.component.html',
  styleUrls: ['./single-stock.component.css']
})
export class SingleStockComponent implements OnInit {
  stock: any = { "margin": 1000, "past": [ 44.81, 43.07, 44.97, 44.68 ], "max": 45, "name": "MCDonalds", "min": 43 };
  constructor(private router: ActivatedRoute, private StockS: StockService, private AccountS: AuthService) {
    this.router.paramMap.subscribe(
      (params: ParamMap) => {
        console.log('params.get("id")', params.get("id"))
        this.StockS.getOneStock(params.get("id")).subscribe(res => {
          this.stock = res.data();
        let start = 20;
        this.data = this.stock.past.map(e => {
          start-=5;
          return { x: start + "min(s) ago", y: e };
            })

        })

      }
    );
    }
  data: Object[] = []

  stockForm: FormGroup;

  ngOnInit(): void {
    this.stockForm = new FormGroup({
      stocks: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(JSON.parse(localStorage.getItem("userData")).total/this.stock.past[3])])
    });
  }
  get stockValueGet(): AbstractControl { // name property
    return this.stockForm.get('stocks')
  }
  //Initializing Primary X Axis
  primaryXAxis: Object = {
      valueType: 'Category',
  };
  submitFunc() {
    const userData = JSON.parse(localStorage.getItem("userData"));
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
      userData.stock.push({ stocksPurchased, price, name: this.stock.name});
    }
    this.AccountS.editUser(userData).then(res => {
      alert("Payment Complete")
    }).catch(err => {
      console.log(err);
    });
    localStorage.setItem("userData", JSON.stringify(userData));
  }

}
/**
 * The code is very unreadable and it must be cleaned, not only for this file but also other files as well. I don't know why but my prettier is not working all a sudden, let me know if there is a way to fix
 */
