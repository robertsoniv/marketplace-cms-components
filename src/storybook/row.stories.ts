import { moduleMetadata } from '@storybook/angular';
import { RowComponent } from 'src/app/components/row/row.component';
import { ContentContainerComponent } from 'src/app/components/content-container/content-container.component';
import { ContentBlockComponent } from 'src/app/components/content-block/content-block.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { RowContentDoc } from 'src/app/models/RowContentDoc.interface';

export default {
    title: 'Row',
    component: RowComponent,
    parameters: {
        component: RowComponent,
    },
    decorators: [
        moduleMetadata({
            declarations: [
                ContentContainerComponent,
                ContentBlockComponent,
                SafeHtmlPipe
            ],
            imports: [],
            providers: [],
            entryComponents: [ContentBlockComponent],
        })
    ]
}

const BasicExampleRow: RowContentDoc = {
    ComponentName: "RowComponent",
    Content: [
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
}
export const BasicExample = () => ({
    component: RowComponent,
    props: {
        content: BasicExampleRow
    }
});