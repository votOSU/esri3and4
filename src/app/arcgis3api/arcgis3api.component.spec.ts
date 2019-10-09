import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Arcgis3apiComponent } from './arcgis3api.component';

describe('Arcgis3apiComponent', () => {
  let component: Arcgis3apiComponent;
  let fixture: ComponentFixture<Arcgis3apiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Arcgis3apiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Arcgis3apiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
