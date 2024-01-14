import { Injectable } from '@angular/core';
import { LoanInfo } from '../model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class EMIService {
  private baseUrl: string = 'http://localhost:8801/api/pnr';

  private eventBus: Subject<string> = new Subject();

  constructor(private http: HttpClient) {}

  calculateEMI(obj: LoanInfo) {
    return this.http.post(`${this.baseUrl}`, obj);
  }

  getComputedResults() {
    return this.http.get(`${this.baseUrl}`);
  }

  sendMessage(): void {
    this.eventBus.next("UPDATE-LOGS");
  }

  getEventBus(): Subject<string> {
    return this.eventBus;
  }
}
