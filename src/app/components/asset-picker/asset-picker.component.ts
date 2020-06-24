import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketplaceSDK } from 'marketplace-javascript-sdk';
import * as MarketplaceSdkInstance from 'marketplace-javascript-sdk';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, takeWhile, filter } from 'rxjs/operators';


@Component({
  selector: 'cms-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.scss']
})
export class AssetPickerComponent implements OnInit, OnDestroy {
  alive = true;
  previousSearchTerm = ''
  searchForm: FormGroup
  list: any;
  parameters = {
    page: 1,
    pageSize: 10,
    filters: {}
  }

  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder,) { }

  

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({search: ''})
    this.onFormChanges();
    this.changePage(1);
    // TODO: remove this - won't be necessary once modal bug is fixed
    MarketplaceSdkInstance.Configuration.Set({
      baseApiUrl: 'https://marketplace-middleware-test.azurewebsites.net',
    });
    MarketplaceSDK.Tokens.SetAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJjcmhpc3RpYW5zdXBwbGllcjQxMTA2IiwiY2lkIjoiN2UwZmQ2MmItOWRkOS00OTM5LTllMGItMjZkODgyZmMzNTA4IiwiaW1wIjoiMTE3NyIsInUiOiIxODEyNjMwIiwidXNydHlwZSI6InN1cHBsaWVyIiwicm9sZSI6WyJCdXllclJlYWRlciIsIk1lQWRtaW4iLCJPcmRlckFkbWluIiwiUGFzc3dvcmRSZXNldCIsIlByaWNlU2NoZWR1bGVBZG1pbiIsIlByaWNlU2NoZWR1bGVSZWFkZXIiLCJQcm9kdWN0QWRtaW4iLCJQcm9kdWN0UmVhZGVyIiwiUHJvbW90aW9uQWRtaW4iLCJQcm9tb3Rpb25SZWFkZXIiLCJTaGlwbWVudEFkbWluIiwiU3VwcGxpZXJBZGRyZXNzUmVhZGVyIiwiU3VwcGxpZXJSZWFkZXIiLCJTdXBwbGllclVzZXJSZWFkZXIiXSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9yZGVyY2xvdWQuaW8iLCJhdWQiOiJodHRwczovL2FwaS5vcmRlcmNsb3VkLmlvIiwiZXhwIjoxNTkzMDM4MjM0LCJuYmYiOjE1OTMwMDk0MzR9.p4057pRwkcn2PMKs5hU75E-gjYD5ybRHMTsXOfnDGds');
  }

  onFormChanges() {
    this.searchForm.controls['search'].valueChanges
      .pipe(
        filter((searchTerm) =>  searchTerm !== this.previousSearchTerm),
        debounceTime(500),
        takeWhile(() => this.alive)
      )
      .subscribe((searchTerm) => {
        this.previousSearchTerm = searchTerm;
        this.search();
      });
  }

  search() {
    // undefined if empty string so sdk ignores parameter completely
    const searchTerm = this.searchForm.controls.search.value || undefined;
    this.parameters.filters['Title'] = searchTerm;
    this.changePage(1);
  }

  changePage(page: number) {
    this.parameters.page = page;
    return MarketplaceSDK.Assets.List(this.parameters)
      .then(assetList => {
        this.list = assetList;
      })
  }
  
  ngOnDestroy() {
    this.alive = false;
  }
}
