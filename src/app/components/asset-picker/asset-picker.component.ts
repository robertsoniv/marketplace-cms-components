import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketplaceSDK } from 'marketplace-javascript-sdk';
import * as MarketplaceSdkInstance from 'marketplace-javascript-sdk';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, takeWhile, filter } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'cms-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.scss']
})
export class AssetPickerComponent implements OnInit, OnDestroy {
  loading = true;
  alive = true;
  previousSearchTerm = ''
  searchForm: FormGroup
  list: any;
  parameters = {
    page: 1,
    pageSize: 10,
    filters: {}
  }

  constructor(
    public modal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private spinner: NgxSpinnerService
    ) { }

  

  ngOnInit(): void {
    // TODO: remove this - won't be necessary once modal bug is fixed
    MarketplaceSdkInstance.Configuration.Set({
      baseApiUrl: 'https://marketplace-middleware-test.azurewebsites.net',
    });
    MarketplaceSDK.Tokens.SetAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJjcmhpc3RpYW5zdXBwbGllcjQxMTA2IiwiY2lkIjoiN2UwZmQ2MmItOWRkOS00OTM5LTllMGItMjZkODgyZmMzNTA4IiwiaW1wIjoiMTE3NyIsInUiOiIxODEyNjMwIiwidXNydHlwZSI6InN1cHBsaWVyIiwicm9sZSI6WyJCdXllclJlYWRlciIsIk1lQWRtaW4iLCJPcmRlckFkbWluIiwiUGFzc3dvcmRSZXNldCIsIlByaWNlU2NoZWR1bGVBZG1pbiIsIlByaWNlU2NoZWR1bGVSZWFkZXIiLCJQcm9kdWN0QWRtaW4iLCJQcm9kdWN0UmVhZGVyIiwiUHJvbW90aW9uQWRtaW4iLCJQcm9tb3Rpb25SZWFkZXIiLCJTaGlwbWVudEFkbWluIiwiU3VwcGxpZXJBZGRyZXNzUmVhZGVyIiwiU3VwcGxpZXJSZWFkZXIiLCJTdXBwbGllclVzZXJSZWFkZXIiXSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9yZGVyY2xvdWQuaW8iLCJhdWQiOiJodHRwczovL2FwaS5vcmRlcmNsb3VkLmlvIiwiZXhwIjoxNTkzNDkxNjMyLCJuYmYiOjE1OTM0NjI4MzJ9.fxBB0Nn8i6efHDylPIeQr0W5Ovx6LmgtEllEOmL-NfY');
    
    
    this.searchForm = this.formBuilder.group({search: ''})
    this.onFormChanges();
    this.changePage(1);
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
    this.loading = true;
    this.spinner.show();
    this.parameters.page = page;
    return MarketplaceSDK.Assets.List(this.parameters, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJjcmhpc3RpYW5zdXBwbGllcjQxMTA2IiwiY2lkIjoiN2UwZmQ2MmItOWRkOS00OTM5LTllMGItMjZkODgyZmMzNTA4IiwiaW1wIjoiMTE3NyIsInUiOiIxODEyNjMwIiwidXNydHlwZSI6InN1cHBsaWVyIiwicm9sZSI6WyJCdXllclJlYWRlciIsIk1lQWRtaW4iLCJPcmRlckFkbWluIiwiUGFzc3dvcmRSZXNldCIsIlByaWNlU2NoZWR1bGVBZG1pbiIsIlByaWNlU2NoZWR1bGVSZWFkZXIiLCJQcm9kdWN0QWRtaW4iLCJQcm9kdWN0UmVhZGVyIiwiUHJvbW90aW9uQWRtaW4iLCJQcm9tb3Rpb25SZWFkZXIiLCJTaGlwbWVudEFkbWluIiwiU3VwcGxpZXJBZGRyZXNzUmVhZGVyIiwiU3VwcGxpZXJSZWFkZXIiLCJTdXBwbGllclVzZXJSZWFkZXIiXSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9yZGVyY2xvdWQuaW8iLCJhdWQiOiJodHRwczovL2FwaS5vcmRlcmNsb3VkLmlvIiwiZXhwIjoxNTkzNTQ5ODU2LCJuYmYiOjE1OTM1MjEwNTZ9.IijJGRwc21koqTv6U2cv8wMrxs1w9fxXBTZPUn9NYnw')
      .then(assetList => {
        this.list = assetList;
      })
      .catch(e => {
        if(e.response.status === 401) {
          alert('Access forbidden');
        } else {
          alert(e.message);
        }
      })
      .finally(() => {
        this.loading = false;
        this.spinner.hide()
      })
  }
  
  ngOnDestroy() {
    this.alive = false;
  }
}
