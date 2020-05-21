import { storiesOf } from '@storybook/angular';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';

storiesOf('Carousel', module).add('Basic Example', () => ({
  component: CarouselComponent,
  moduleMetadata: {
    declarations: [],
    imports: [],
    providers: [],
    entryComponents: [],
  },
  props: {},
}));
