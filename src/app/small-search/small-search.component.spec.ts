import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSearchComponent } from './small-search.component';

describe('SmallSearchComponent', () => {
  let component: SmallSearchComponent;
  let fixture: ComponentFixture<SmallSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
