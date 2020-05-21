import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentDoc } from 'src/app/models/ContentDoc.interface';
import { takeWhile } from 'rxjs/operators';
import { ContentBlock } from 'src/app/models/ConentBlock.interface';

@Component({
  selector: 'cms-content-container',
  template: '<ng-template #container></ng-template>',
  styleUrls: ['./content-container.component.scss']
})
export class ContentContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef
  @Input() content: ContentBlock;
  alive = true;

  constructor(
    private resolver: ComponentFactoryResolver,
    private httpClient: HttpClient
  ) { }

  ngAfterViewInit() {
    this.renderComponent(this.content.ComponentName, this.content);
    // return this.httpClient.get(this.contentDocUrl)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((doc: ContentDoc) => {
    //     this.renderComponent(doc.Type, doc);
    //   }, (error: any) => {
    //     console.log(mockData);
    //     this.renderComponent(mockData.Type, mockData);
    //   })
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
