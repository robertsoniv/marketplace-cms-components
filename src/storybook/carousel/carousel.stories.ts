import { storiesOf } from '@storybook/angular';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

storiesOf('Carousel', module).add('Basic Example', () => ({
  component: CarouselComponent,
  moduleMetadata: {
    declarations: [],
    imports: [NgbCarouselModule],
    providers: [],
    entryComponents: [],
  },
  props: {},
}));
