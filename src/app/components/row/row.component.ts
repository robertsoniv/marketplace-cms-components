import { Component, OnInit, Input } from '@angular/core';
import { RowContentDoc } from 'src/app/models/RowContentDoc.interface';

@Component({
  selector: 'cms-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input() content: RowContentDoc;

  constructor() { }

  ngOnInit(): void {
  }
}
