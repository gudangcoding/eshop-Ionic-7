import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProdukPage } from './detail-produk.page';

describe('DetailProdukPage', () => {
  let component: DetailProdukPage;
  let fixture: ComponentFixture<DetailProdukPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
