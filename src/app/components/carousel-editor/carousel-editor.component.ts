import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AssetPickerComponent } from '../asset-picker/asset-picker.component';
import { CarouselSlide } from 'src/app/models/CarouselSlide.interface';
import { v4 as guid } from 'uuid';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'cms-carousel-editor',
  templateUrl: './carousel-editor.component.html',
  styleUrls: ['./carousel-editor.component.scss']
})
export class CarouselEditorComponent implements OnInit {
  chooseSlideTypeModal: NgbModalRef;
  slideEditForm: FormGroup;
  selectedSlide: CarouselSlide;
  slides: CarouselSlide[] = [];
  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.slideEditForm = this.formBuilder.group({Heading: '', Subheading: '', ActionText: '', ActionUrl: ''})
    this.onSlideEditFormChanges();
  }

  onSlideEditFormChanges() {
    this.slideEditForm.valueChanges.subscribe(formValues => {
      const index = this.getSlideIndex(this.selectedSlide)
      this.slides[index] = {...this.selectedSlide, ...formValues}
    })
  }

  addSlide(chooseSlideTypeModal) {
    this.chooseSlideTypeModal = this.modalService.open(chooseSlideTypeModal)
  }

  openAssetPicker() {
    this.chooseSlideTypeModal.close();
    const modalRef = this.modalService.open(AssetPickerComponent, { size: 'xl' });
    modalRef.result.then(asset => {
      const slide = {
        ID: guid(),
        ImageTitle: asset.Title,
        ImageUrl: asset.Url
      };
      this.slides.push(slide);
      this.selectSlide(slide);
    })
  }

  openProductPicker() {
    console.log('Product picker clicked');
  }

  getSlideIndex(slide: CarouselSlide) {
    return this.slides.map(a => a.ImageUrl).indexOf(slide.ImageUrl);
  }

  isSelected(slide: CarouselSlide) {
    if(!this.selectedSlide) {
      return false;
    }
    return this.selectedSlide.ImageUrl === slide.ImageUrl;
  }

  selectSlide(slide: CarouselSlide) {
    this.selectedSlide = slide;
    this.slideEditForm.controls['Heading'].setValue(slide.Heading)
    this.slideEditForm.controls['Subheading'].setValue(slide.Subheading)
    this.slideEditForm.controls['ActionText'].setValue(slide.ActionText)
    this.slideEditForm.controls['ActionUrl'].setValue(slide.ActionUrl)
  }

}
