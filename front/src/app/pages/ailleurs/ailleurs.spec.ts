import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ailleurs } from './ailleurs';

describe('Ailleurs', () => {
  let component: Ailleurs;
  let fixture: ComponentFixture<Ailleurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ailleurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ailleurs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
