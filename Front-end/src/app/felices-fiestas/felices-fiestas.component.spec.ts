import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicesFiestasComponent } from './felices-fiestas.component';

describe('FelicesFiestasComponent', () => {
  let component: FelicesFiestasComponent;
  let fixture: ComponentFixture<FelicesFiestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FelicesFiestasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FelicesFiestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
