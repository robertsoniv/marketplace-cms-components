import { Component, OnInit, Input } from '@angular/core';
import { ColumnContentDoc, BootstrapMediaDefinition } from 'src/app/models/ColumnContentDoc.interface';

@Component({
  selector: 'cms-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() content: ColumnContentDoc;
  widthClass: string;

  constructor() { }

  ngOnInit(): void {
    this.widthClass = this.getWidthClass(this.content.Width);
  }

  getWidthClass(definition: number | BootstrapMediaDefinition | undefined) {
    if(!definition) {
      return 'col';
    }
    if(typeof definition === 'number') {
      return `col-${definition}`;
    }
    let classNamesArr: string[] = []
    for(const breakpoint in definition){
      const columnWidth = definition[breakpoint];
      classNamesArr = [...classNamesArr, `col-${breakpoint}-${columnWidth}`]
    }
    return classNamesArr.join(' ');
  }

}
