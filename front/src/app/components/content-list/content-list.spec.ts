import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListComponent } from './content-list';

describe('ContentListComponent', () => {
  let component: ContentListComponent;
  let fixture: ComponentFixture<ContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentListComponent);
    fixture.componentRef.setInput('contentType', 'poeme');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
