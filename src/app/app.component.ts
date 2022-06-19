import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'permit-to-work-v2s1';
  imageSource: string = "assets/images/temasek_polytechnic_logo.png";
  imageAlt: string = "Temasek Polytechnic";

  constructor(private router: Router) { }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}