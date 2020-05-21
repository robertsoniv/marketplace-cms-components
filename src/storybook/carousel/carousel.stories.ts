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
  props: {
    slides: [944, 1011, 984].map((n) => ({
      text: {
        title: 'Testing Title',
        subtitle: 'Testing Text',
      },
      background: {
        image: {
          url: `https://picsum.photos/id/${n}/1700/500`,
          title: 'Test Image Title',
        },
      },
    })),
  },
}));
