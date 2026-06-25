import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingContactComponent } from './floating-contact.component';

describe('FloatingContactComponent', () => {
  let component: FloatingContactComponent;
  let fixture: ComponentFixture<FloatingContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
