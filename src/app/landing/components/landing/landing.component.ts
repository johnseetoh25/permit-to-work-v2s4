import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


  constructor(
    private router: Router
  ) { }


  public ngOnInit(): void { }


  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }


}