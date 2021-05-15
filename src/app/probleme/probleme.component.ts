import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { ProblemeService } from './probleme.service';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { Router } from '@angular/router';
import { Iprobleme } from './probleme';
@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeDeProbleme: ITypeProbleme[];
  errorMessage: string;

  probleme: Iprobleme;

  //constructor(private fb: FormBuilder, private typeProbleme: TypeproblemeService) { }
  constructor(private fb: FormBuilder, private typeProbleme: TypeproblemeService, private problemeService: ProblemeService, private route : Router) { }
  

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.required, ZoneValidator.longueurMinimum(3)]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      typeprobleme: ['', [Validators.required]],
      typeNoti: ['NePasNoti'],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: { value: Date(), disabled: true }

    });

    this.typeProbleme.obtenirTypeProbleme()
      .subscribe(cat => this.typeDeProbleme = cat,
        error => this.errorMessage = <any>error);
    this.problemeForm.get('typeNoti').valueChanges
      .subscribe(value => this.appliquerNotifications(value));

  }
  

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
      // Copy the form values over the problem object values
      this.probleme = this.problemeForm.value;
      this.probleme.id = 0;
      this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
      //this.probleme.dateProbleme = new Date();
      this.problemeService.saveProbleme(this.probleme)
        .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
          () => this.onSaveComplete(),  // Fonction callback
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.problemeForm.dirty) {
      this.onSaveComplete();
    }
  }
  onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  } 
  
  appliquerNotifications(typeNoti: string): void {
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const groupeCourriel = this.problemeForm.get('courrielGroup');

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmControl.clearValidators();
    courrielConfirmControl.reset();
    courrielConfirmControl.disable();


    if (typeNoti === 'ParCourriel') {
      courrielControl.enable();
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmControl.enable();
      courrielConfirmControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      groupeCourriel.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents])])



    } else if (typeNoti === 'ParTelephone') {
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(10)]);
    } else if (typeNoti === 'NePasNoti') {

    }
    courrielControl.updateValueAndValidity();
    courrielConfirmControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }

}
