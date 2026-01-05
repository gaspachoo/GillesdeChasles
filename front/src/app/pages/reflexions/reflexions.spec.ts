import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reflexions } from './reflexions';

describe('Reflexions', () => {
  let component: Reflexions;
  let fixture: ComponentFixture<Reflexions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reflexions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reflexions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
