import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
// https://stackoverflow.com/questions/45437092/rotate-custom-marker-google-maps-api
//   https://stackoverflow.com/questions/23149613/change-google-map-marker-orientation-according-path-direction
//   https://stackoverflow.com/questions/6800613/rotating-image-marker-image-on-google-map-v3
  constructor() { }

  ngOnInit(): void {
  }

}
