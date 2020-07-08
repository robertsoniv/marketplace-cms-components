import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDateSettingsComponent } from './section-date-settings.component';

describe('SectionDateSettingsComponent', () => {
  let component: SectionDateSettingsComponent;
  let fixture: ComponentFixture<SectionDateSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionDateSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
