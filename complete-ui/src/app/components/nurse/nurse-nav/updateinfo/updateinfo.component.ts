import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.css']
})
export class UpdateinfoComponent {
  constructor(private router: Router){}
  
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  updateform = new FormGroup({
    bp: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]{1,2}\\/[1-9][0-9]{1,2}$')]),
    rate: new FormControl('', [Validators.required,Validators.pattern('^(6[0-9]|[7-9][0-9]|1[01][0-9]|120)$')]),
    spo2: new FormControl('', [Validators.required,Validators.pattern('^(9[0-9]|100)%$')]),
    height: new FormControl('',[Validators.required,Validators.pattern('^(6[0-9]|[7-9][0-9]|1[01][0-9]|250)$')]),
    weight: new FormControl('', [Validators.required, Validators.pattern('^(6[0-9]|[7-9][0-9]|1[01][0-9]|350)$')]),
    temp: new FormControl('', [Validators.required, Validators.pattern('^([3-9][0-9]|[1-9][0-9]{2})\.?[0-9]?$')])
  });

  update() {
    console.log(this.updateform);
    if (this.updateform.valid) {
      console.warn(this.updateform.value);
    } else {
      // show error message
      console.log(this.updateform);
      console.log('Invalid form');
    }
  }

  goBack(){
    this.router.navigate(['nurse-dashboard'])
  }

  get bp() {
    return this.updateform.get('bp');
  }

  get rate() {
    return this.updateform.get('rate');
  }

  get spo2() {
    return this.updateform.get('spo2');
  }

  get height() {
    return this.updateform.get('height');
  }

  get weight() {
    return this.updateform.get('weight');
  }

  get temp() {
    return this.updateform.get('temp');
  }

  getErrorMessage(formControlName: string) {
    if (this.updateform.get(formControlName)?.hasError('required')) {
      return 'This field is required';
    } else if (this.updateform.get(formControlName)?.hasError('pattern')) {
      if (formControlName === 'bp') {
        return 'Please enter a valid blood pressure reading in the format of systolic/diastolic (e.g. 120/80)';
      } else if (formControlName === 'rate') {
        return 'Please enter a valid heart rate reading between 60 and 120 bpm';
      } else if (formControlName === 'spo2') {
        return 'Please enter a valid SpO2 reading between 90% and 100%';
      } else if (formControlName === 'height') {
        return 'Please enter a valid height reading like 126.8';
      } else if (formControlName === 'weight'){
        return 'Please enter a valid height reading like 90';
      }else if (formControlName === 'temp'){
        return 'Please enter a valid height reading like 37.1';
      }else{
        return 'Invalid input';
      }
    }
    return '';
  }
}
