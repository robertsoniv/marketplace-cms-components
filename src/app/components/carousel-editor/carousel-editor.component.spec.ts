import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselEditorComponent } from './carousel-editor.component';

describe('CarouselEditorComponent', () => {
  let component: CarouselEditorComponent;
  let fixture: ComponentFixture<CarouselEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
