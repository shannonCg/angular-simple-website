import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  
  hero?: Hero;
  heroName = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
                    .subscribe(hero => {
                      this.hero = hero;
                      this.heroName.setValue(this.hero.name);
                    });
  }

  save(): void{
    if(!this.hero || !this.heroName.value) return;
    this.hero.name = this.heroName.value;
    this.heroService.updateHero(this.hero)
                    .subscribe(() => this.goBack());
  }

  goBack(): void{
    this.location.back();
  }
}
