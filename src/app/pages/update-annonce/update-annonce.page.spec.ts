import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateAnnoncePage } from './update-annonce.page';

describe('UpdateAnnoncePage', () => {
  let component: UpdateAnnoncePage;
  let fixture: ComponentFixture<UpdateAnnoncePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
