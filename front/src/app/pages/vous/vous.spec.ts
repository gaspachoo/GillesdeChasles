import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vous } from './vous';

describe('Vous', () => {
  let component: Vous;
  let fixture: ComponentFixture<Vous>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vous]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vous);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
