export interface ContentBlock {
    Background: Background;
    DateRange: DateRange;
    Alignment: 'Left' | 'Center' | 'Right' | 'Top' | 'Middle' | 'Bottom';
    Button: ContentButton;
}

export interface Background {
    Image: string; // assetID
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