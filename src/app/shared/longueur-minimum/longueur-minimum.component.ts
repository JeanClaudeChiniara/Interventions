import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZoneValidator {
    static longueurMinimum(longueur: number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            
            if(!valeurControle.value){
                return {'nbreCaracteresInsuffisants': true};
            }
            else if((valeurControle.value.trim()).length >= longueur){
                 return null;
            }
            return {'nbreCaracteresInsuffisants': true}; 
        };
    }
}