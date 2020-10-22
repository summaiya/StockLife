import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from './../../_services/spinner.service';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public showSpinner = false;

  constructor(
    private spinnerService: SpinnerService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    // getSpinnerObserver() does not exist in the SpinnerService's class.
  }

}
