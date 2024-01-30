import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeWorkerComponent } from './registro-de-worker.component';

describe('RegistroDeWorkerComponent', () => {
  let component: RegistroDeWorkerComponent;
  let fixture: ComponentFixture<RegistroDeWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDeWorkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroDeWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
