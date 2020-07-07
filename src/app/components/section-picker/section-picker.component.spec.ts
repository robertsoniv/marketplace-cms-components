import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPickerComponent } from './section-picker.component';

describe('SectionPickerComponent', () => {
  let component: SectionPickerComponent;
  let fixture: ComponentFixture<SectionPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
