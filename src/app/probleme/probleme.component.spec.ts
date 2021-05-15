import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
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
    let validator  = ZoneValidator.longueurMinimum(3);
    let control = {value: 'aa'};
    let result= validator(control as AbstractControl);

    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zonePRENOM = component.problemeForm.controls['prenom'];
    zonePRENOM.setValue('a'.repeat(3))
    expect(zonePRENOM.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zonePRENOM = component.problemeForm.controls['prenom'];
    zonePRENOM.setValue('a'.repeat(200))
    expect(zonePRENOM.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zonePRENOM = component.problemeForm.get('prenom');
    zonePRENOM.setValue('')
    errors = zonePRENOM.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let validator  = ZoneValidator.longueurMinimum(3);
    let control = {value: '          '};
    let result= validator(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère  ', () => {
    let validator  = ZoneValidator.longueurMinimum(3);
    let control = {value: '  a'};
    let result= validator(control as AbstractControl);

    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNoti');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNoti');

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toEqual(null);
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNoti');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNoti');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTrue();
  });
  
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTrue();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID');
  });
  
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID');
  });
  
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');
    
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue("asdasdasd");
    expect(zone.status).toEqual('INVALID');
  });
  
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null ', () => {
    component.appliquerNotifications('ParCourriel');
    let validator  = emailMatcherValidator.courrielDifferents();
    let errors = {};
    
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation= component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue(null); 
    courrielConfirmation.setValue('asd@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroupe');
    errors = groupe.errors || {};
    expect(errors['courrielDifferents']).toBeNull();
  });  
});
 