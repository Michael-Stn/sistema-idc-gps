import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPetComponent } from './item-pet.component';

describe('ItemPetComponent', () => {
  let component: ItemPetComponent;
  let fixture: ComponentFixture<ItemPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
