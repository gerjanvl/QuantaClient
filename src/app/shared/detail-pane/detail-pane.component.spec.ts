import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaneComponent } from './detail-pane.component';

describe('DetailPaneComponent', () => {
  let component: DetailPaneComponent;
  let fixture: ComponentFixture<DetailPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
