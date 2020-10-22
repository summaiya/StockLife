import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private afs: AngularFirestore) { }

  getAllStocks(): Observable<firestore.QuerySnapshot<firestore.DocumentData>> {
    return this.afs.collection('stock').get();
  }

  getOneStock(id: string): Observable<firestore.DocumentSnapshot<firestore.DocumentData>> {
    return this.afs.collection('stock').doc(id).get();
  }
}
