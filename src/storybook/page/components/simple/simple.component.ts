import { Component, OnInit } from '@angular/core';
import { ContentDoc } from 'src/app/models/ContentDoc.interface';

interface SimpleContent extends ContentDoc {
  Title: string;
  Text: string;
  ImageUrl: string;
}

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {
  content: SimpleContent;

  constructor() { }

  ngOnInit(): void {
  }

}
