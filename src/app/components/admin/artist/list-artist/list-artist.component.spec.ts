import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArtistComponent } from './list-artist.component';

describe('ListArtistComponent', () => {
  let component: ListArtistComponent;
  let fixture: ComponentFixture<ListArtistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArtistComponent]
    });
    fixture = TestBed.createComponent(ListArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
