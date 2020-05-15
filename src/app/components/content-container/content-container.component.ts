import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentDoc } from 'src/app/models/ContentDoc.interface';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'cms-content-container',
  template: '<ng-template #container></ng-template>',
  styleUrls: ['./content-container.component.scss']
})
export class ContentContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef
  @Input() contentDocUrl: string;
  alive = true;

  constructor(
    private resolver: ComponentFactoryResolver,
    private httpClient: HttpClient
  ) { }

  ngAfterViewInit() {
    return this.httpClient.get(this.contentDocUrl)
      .pipe(takeWhile(() => this.alive))
      .subscribe((doc: ContentDoc) => {
        this.renderComponent(doc.Type, doc);
      })
  }

  ngOnDestroy() {
    // unsubscribe when component is destroyed to prevent memory leak
    this.alive = false;
  }

  renderComponent(componentName: string, content: any): void {
    // dynamically renders component
    const factories = Array.from(this.resolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentName);
    const factory = this.resolver.resolveComponentFactory(factoryClass);
    const componentRef = this.container.createComponent(factory);

    // add content to component instance
    componentRef.instance.content = content;
  }
}
