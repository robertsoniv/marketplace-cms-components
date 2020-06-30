import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import sectionPickerMock from './section-picker.mock';

@Component({
  selector: 'cms-section-picker',
  templateUrl: './section-picker.component.html',
  styleUrls: ['./section-picker.component.scss']
})
export class SectionPickerComponent implements OnInit {
  sectionTemplates = sectionPickerMock;
  selectedTemplateIndex: number;
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public zone: NgZone
  ) {}

  ngOnInit(): void {}

  handleSelectTemplate(index) {
    console.log('hit', index);
    this.selectedTemplateIndex = index;
  }

  submit() {
    this.modal.close(this.sectionTemplates[this.selectedTemplateIndex]);
  }
}
