import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEntryListItemComponent } from './single-entry-list-item.component';

describe('SingleEntryListItemComponent', () => {
  let component: SingleEntryListItemComponent;
  let fixture: ComponentFixture<SingleEntryListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEntryListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEntryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
