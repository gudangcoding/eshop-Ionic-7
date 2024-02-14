import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhislistPage } from './whislist.page';

describe('WhislistPage', () => {
  let component: WhislistPage;
  let fixture: ComponentFixture<WhislistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhislistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
