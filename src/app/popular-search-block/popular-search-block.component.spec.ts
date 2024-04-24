import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSearchBlockComponent } from './popular-search-block.component';

describe('PopularSearchBlockComponent', () => {
  let component: PopularSearchBlockComponent;
  let fixture: ComponentFixture<PopularSearchBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularSearchBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularSearchBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
