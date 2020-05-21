import { Component, OnInit, Input } from '@angular/core';
import { ContentDoc } from 'src/app/models/ContentDoc.interface';
import { ContentBlock } from 'src/app/models/ConentBlock.interface';

interface SimpleContent extends ContentDoc {
  Title: string;
  Text: string;
  ImageUrl: string;
}

@Component({
  selector: 'app-content-block',
  templateUrl: './ContentBlock.component.html',
  styleUrls: ['./ContentBlock.component.scss'],
})
export class ContentBlockComponent implements OnInit {
  content: ContentBlock;

  constructor() { }

  ngOnInit(): void {
  }

}
