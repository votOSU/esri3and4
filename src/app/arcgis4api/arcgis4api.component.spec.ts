import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Arcgis4apiComponent } from './arcgis4api.component';

describe('Arcgis4apiComponent', () => {
  let component: Arcgis4apiComponent;
  let fixture: ComponentFixture<Arcgis4apiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Arcgis4apiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Arcgis4apiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
