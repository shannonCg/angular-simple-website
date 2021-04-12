import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  heroForm!:FormGroup;

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get name(){
    return this.heroForm.get('name')!;
  }

  onSubmit(){
    console.log(this.heroForm.value);
  }
}
