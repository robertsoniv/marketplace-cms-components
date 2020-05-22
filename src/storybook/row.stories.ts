import { storiesOf } from '@storybook/angular';
import { RowComponent } from 'src/app/components/row/row.component';
import { ContentContainerComponent } from 'src/app/components/content-container/content-container.component';
import { ContentBlockComponent } from 'src/app/components/content-block/content-block.component';
import { ContentBlockDoc } from 'src/app/models/ContentBlockDoc.interface';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

const ExampleRowContent: ContentBlockDoc[] = [
    {
        ComponentName: "ContentBlockComponent",
        Background: {
            ImageUrl: null,
            Color: "#B0AFF0"
        },
        DateRange: {
            StartDate: null,
            EndDate: null
        },
        HorizontalAlignment: "Center",
        VerticalAlignment: "Middle",
        TextArea: "<h2>Product 1</h2><p>a golf club</p><h2>Product 2</h2><p>a basketball</p>",
    },
    {
        ComponentName: "ContentBlockComponent",
        Background: {
            "ImageUrl": null,
            "Color": "#E8D0C6"
        },
        DateRange: {
            StartDate: null,
            EndDate: null
        },
        HorizontalAlignment: "Center",
        VerticalAlignment: "Middle",
        TextArea: "<h2>Product 3</h2><p>Snowboard</p><h2>Product 4</h2><p>Hobby horse</p>",
    }
]

const ExampleRow = {
    ComponentName: "RowComponent",
    Content: ExampleRowContent
}

storiesOf('Row', module).add('Basic Example', () => ({
    component: RowComponent,
    moduleMetadata: {
        declarations: [
            ContentContainerComponent, 
            ContentBlockComponent,
            SafeHtmlPipe
        ],
        imports: [],
        providers: [],
        entryComponents: [ContentBlockComponent],
    },
    props: {
        content: ExampleRow
    },
}))
.addParameters({ component: RowComponent });
