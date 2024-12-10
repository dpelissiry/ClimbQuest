import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallResultBlockComponent } from './small-result-block.component';

describe('SmallResultBlockComponent', () => {
  let component: SmallResultBlockComponent;
  let fixture: ComponentFixture<SmallResultBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallResultBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallResultBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
