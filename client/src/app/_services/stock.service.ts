import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private afs: AngularFirestore) {}
   getAllStocks() {
     return this.afs.collection('stock').get();
  }
  getOneStock(id: string) {
    return this.afs.collection('stock').doc(id).get();
  }
  addStocks() {}
}
