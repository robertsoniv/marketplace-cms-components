import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor() {}

  public images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/1700/500`
  );

  ngOnInit(): void {}
}
