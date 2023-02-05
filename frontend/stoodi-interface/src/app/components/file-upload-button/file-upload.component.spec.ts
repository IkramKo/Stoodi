import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadButtonComponent } from './file-upload-button.component';

describe('FileUploadComponent', () => {
  let component: FileUploadButtonComponent;
  let fixture: ComponentFixture<FileUploadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
