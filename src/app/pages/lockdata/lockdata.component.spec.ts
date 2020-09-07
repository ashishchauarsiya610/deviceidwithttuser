import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LockdataComponent } from './lockdata.component';

describe('LockdataComponent', () => {
  let component: LockdataComponent;
  let fixture: ComponentFixture<LockdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockdataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LockdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
