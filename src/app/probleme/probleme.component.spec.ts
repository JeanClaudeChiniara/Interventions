import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let errors = {};
    let zonePRENOM = component.problemeForm.get('prenom');
    zonePRENOM.setValue('a'.repeat(2))
    errors = zonePRENOM.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zonePRENOM = component.problemeForm.controls['prenom'];
    zonePRENOM.setValue('a'.repeat(3))
    expect(zonePRENOM.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zonePRENOM = component.problemeForm.controls['prenom'];
    zonePRENOM.setValue('a  '.repeat(1))
    expect(zonePRENOM.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zonePRENOM = component.problemeForm.get('prenom');
    zonePRENOM.setValue('')
    errors = zonePRENOM.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#5 | Zone PRÉNOM valide avec 10 espaces', () => {
    let zonePRENOM = component.problemeForm.controls['prenom'];
    zonePRENOM.setValue(' '.repeat(10))
    expect(zonePRENOM.valid).toBeTruthy();
  });

  it('#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère  ', () => {
    let zonePRENOM = component.problemeForm.controls['prenom'];
    zonePRENOM.setValue('  a')
    expect(zonePRENOM.valid).toBeTruthy();
  });
  
});
