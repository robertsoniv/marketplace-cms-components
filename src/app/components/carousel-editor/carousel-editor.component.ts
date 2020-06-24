import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetPickerComponent } from '../asset-picker/asset-picker.component';

@Component({
  selector: 'cms-carousel-editor',
  templateUrl: './carousel-editor.component.html',
  styleUrls: ['./carousel-editor.component.scss']
})
export class CarouselEditorComponent implements OnInit {

  constructor(public modal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openAssetPicker() {
    const modalRef = this.modalService.open(AssetPickerComponent);
    modalRef.componentInstance.onSuccess = this.onAssetSelected.bind(this);
    // modalRef.componentInstance.fileMeta = meta;
  }

  onAssetSelected(a, b) {
    console.log('asset selected', a, b)
  }

}
