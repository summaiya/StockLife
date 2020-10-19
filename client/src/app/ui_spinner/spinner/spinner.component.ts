import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './../../_services/spinner.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

 public Spinner = false;

  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef ,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.init();
  }

  init() {

    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.Spinner = (status === 'start');
      if(this.Spinner){
      this.spinner.show();
      }else{
        this.spinner.hide();
      }
      this.cdRef.detectChanges();
    });
  }

}