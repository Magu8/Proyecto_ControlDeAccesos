import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConexionComponent } from './first-conexion.component';

describe('FirstConexionComponent', () => {
  let component: FirstConexionComponent;
  let fixture: ComponentFixture<FirstConexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstConexionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
