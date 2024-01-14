import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { InputFormComponent } from './inputform.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import EMIService from "../service/emi.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import FormFieldComponent from "../shared/form-field.component";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

let dispatchFakeEvent = (element: EventTarget, type: string, bubbles: boolean) => {
    const event = document.createEvent('Event');
    event.initEvent(type, bubbles, false);
    element.dispatchEvent(event);
}

let makeClickEvent = (target: EventTarget): Partial<MouseEvent> => {
    return {
      preventDefault(): void {},
      stopPropagation(): void {},
      stopImmediatePropagation(): void {},
      type: 'click',
      target,
      currentTarget: target,
      bubbles: true,
      cancelable: true,
      button: 0
    };
}

class MockEMIService {
    calculateEMI() {
    }
}

describe('Input form component', () => {
    let component: InputFormComponent;
    let fixture: ComponentFixture<InputFormComponent>;
    let emiServiceSpy: EMIService;

    beforeEach(waitForAsync(() => {
        emiServiceSpy = jasmine.createSpyObj(MockEMIService, ["calculateEMI"]);
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [InputFormComponent, FormFieldComponent],
            providers:[{provide: EMIService, useValue: emiServiceSpy}],
            teardown: { destroyAfterEach: false }
        }).compileComponents();
        fixture = TestBed.createComponent(InputFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("Validate Input Form Component Creation", () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    it("Set form fields and expect calculateEMI to be called on click of calculate", () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            let loanvalueInput: DebugElement = fixture.debugElement.query(By.css("#loanvalue"));
            loanvalueInput.nativeElement.value = "2345";
            dispatchFakeEvent(loanvalueInput.nativeElement, 'input', true);

            let yearlyinterestInput: DebugElement = fixture.debugElement.query(By.css("#yearlyinterest"));
            yearlyinterestInput.nativeElement.value = "2";
            dispatchFakeEvent(yearlyinterestInput.nativeElement, 'input', true);

            let loantermInput: DebugElement = fixture.debugElement.query(By.css("#loanterm"));
            loantermInput.nativeElement.value = "2";
            dispatchFakeEvent(loantermInput.nativeElement, 'input', true);

            let emailInput: DebugElement = fixture.debugElement.query(By.css("#email"));
            emailInput.nativeElement.value = "sam@gmail.com";
            dispatchFakeEvent(emailInput.nativeElement, 'input', true);

            let btnpostCalculator: DebugElement = fixture.debugElement.query(By.css("#btnSave"));
            btnpostCalculator.triggerEventHandler('click', makeClickEvent(btnpostCalculator.nativeElement));

            expect(emiServiceSpy.calculateEMI).toHaveBeenCalledTimes(1);
        });
    });
});