import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAnnoncesPage } from './my-annonces.page';

describe('MyAnnoncesPage', () => {
  let component: MyAnnoncesPage;
  let fixture: ComponentFixture<MyAnnoncesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyAnnoncesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
