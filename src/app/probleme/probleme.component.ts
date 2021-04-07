import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeDeProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typeProbleme: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['',[Validators.required, ZoneValidator.longueurMinimum(3)]],
        nom: ['', [Validators.required, Validators.maxLength(50)]],
        typeprobleme: ['',[Validators.required]]
    });

    this.typeProbleme.obtenirTypeProbleme()
    .subscribe(cat => this.typeDeProbleme = cat,
               error => this.errorMessage = <any>error);  

  }
  save():void{}

}
