import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  content: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.content);
  }

}
