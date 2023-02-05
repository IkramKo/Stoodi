import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptBoxComponent } from './transcript-box.component';

describe('TranscriptBoxComponent', () => {
  let component: TranscriptBoxComponent;
  let fixture: ComponentFixture<TranscriptBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscriptBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
