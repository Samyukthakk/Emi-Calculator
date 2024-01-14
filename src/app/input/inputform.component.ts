import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import EMIService from '../service/emi.service';

@Component({
  selector: 'inputform',
  template: `
    <div class="loan-calculator">
      <div class="top">
        <h2>Emi Calculator</h2>
        <form [formGroup]="form" class="form-container">
          <form-field label-text="Loanvalue : ">
            <input
              id="loanvalue"
              class="icon-name"
              formControlName="principle"
              placeholder="loan value"
              type="text"
            />
            <div
              class="errorcheck"
              *ngIf="
                form.controls.principle.invalid &&
                form.controls.principle.touched
              "
            >
              value must be a positive number.
            </div>
          </form-field>
          <form-field label-text="Interest rate(yearly) : ">
            <input
              id="yearlyinterest"
              class="icon-phone"
              formControlName="roi"
              placeholder="yearly interest rate"
              type="text"
            />
            <div
              class="errorcheck"
              *ngIf="form.controls.roi.invalid && form.controls.roi.touched"
            >
              value must be between 1 to 100.
            </div>
          </form-field>
          <form-field label-text="Loan Term(yearly) : ">
            <input
              id="loanterm"
              class="icon-phone"
              formControlName="months"
              placeholder="enter loan term"
              type="text"
            />
            <div
              class="errorcheck"
              *ngIf="
                form.controls.months.invalid && form.controls.months.touched
              "
            >
              value must be between 1 to 30.
            </div>
          </form-field>
          <form-field label-text="Email : ">
            <input
              id="email"
              class="icon-phone"
              formControlName="email"
              placeholder="enter your email"
              type="email"
            />
            <div
              class="errorcheck"
              *ngIf="form.controls.email.invalid && form.controls.email.touched"
            >
              please enter valid email.
            </div>
          </form-field>
          <form-field>
            <button
              id="btnSave"
              (click)="sendValues()"
              [disabled]="!form.valid"
            >
              Calculate
            </button>
          </form-field>
        </form>
      </div>
      <div class="results">
        <div class="left">
          <div class="loan-emi">
            <h3>
              EMI Amount:<span class="resultvalue">{{ result }}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InputFormComponent implements OnInit {
  form!: FormGroup;
  numRegex = /^-?\d*[.,]?\d{0,5}$/;
  emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  result!: string;
  constructor(private formBuilder: FormBuilder, private service: EMIService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      principle: [
        null,
        [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')],
      ],
      roi: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(this.numRegex),
        ],
      ],
      months: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(30),
          Validators.pattern('[0-9]*'),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailRegex),
        ],
      ],
    });
  }

  sendValues() {
    this.service
      .calculateEMI({ ...this.form.value, months: this.form.value.months * 12 })
      .subscribe({
        next: (res: any) => {
          this.result = ` € ${res.result}`;
          this.service.sendMessage();
        },
        error: (error) => {
          this.result =
            error?.error?.messages?.toString() ??
            'Unable to calculate EMI, please check input values!';
        },
      });
  }
}
