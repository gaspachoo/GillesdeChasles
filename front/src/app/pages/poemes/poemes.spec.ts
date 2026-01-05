import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poemes } from './poemes';

describe('Poemes', () => {
  let component: Poemes;
  let fixture: ComponentFixture<Poemes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poemes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Poemes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
