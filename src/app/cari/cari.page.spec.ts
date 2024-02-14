import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CariPage } from './cari.page';

describe('CariPage', () => {
  let component: CariPage;
  let fixture: ComponentFixture<CariPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
