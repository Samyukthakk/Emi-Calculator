import { Component, OnInit } from '@angular/core';
import { LoanInfo } from '../model';
import EMIService from '../service/emi.service';

@Component({
  selector: 'list',
  template: `
    <h3 class="listheader">Enquiry List</h3>
    <div *ngFor="let info of loanInfo">
      <div class="message-container">
        <label
          >Principle:{{ info.principle }} - Interest:{{ info.roi }} - EMI:
          {{ info.result }}</label
        >
      </div>
    </div>
  `,
})
export class ListComponent implements OnInit {
  public loanInfo: LoanInfo[] = [];

  constructor(private service: EMIService) {}
  ngOnInit(): void {
    this.service.getEventBus().subscribe((res: any) => {
      this.getLoanInfo();
    });
    this.getLoanInfo();
  }

  getLoanInfo() {
    this.service.getComputedResults().subscribe((res: any) => {
      this.loanInfo = res;
    });
  }
}
