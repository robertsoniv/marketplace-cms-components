export interface ContentBlock {
    ComponentName: string;
    Background: Background;
    DateRange: DateRange;
    HorizontalAlignment: 'Left' | 'Center' | 'Right';
    VerticalAlignment: 'Top' | 'Middle' | 'Bottom';
    Button: ContentButton;
    TextArea: string;
}

export interface Background {
    ImageUrl: string; // assetID
    Color: string;
}

export interface DateRange {
    StartDate: Date;
    EndDate: Date;
}

export interface ContentButton {
    Text: string;
    Link: string;
    Color: string;
    Outlined: boolean;
    Variant: boolean;
}