import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesCreationComponent } from './devices-creation.component';

describe('DevicesCreationComponent', () => {
  let component: DevicesCreationComponent;
  let fixture: ComponentFixture<DevicesCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
