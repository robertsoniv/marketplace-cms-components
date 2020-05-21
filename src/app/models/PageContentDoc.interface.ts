export interface PageContentDoc {
    Url: string;
    SiteUrl: string;
    Title: string;
    Description: string;
    MetaImageUrl: string;
    DateLastUpdated: string;
    Active: boolean;
    ContentDocUrls: string[];
    Content: any[];
    HeaderEmbeds?: string
    FooterEmbeds?: string
    NavTitle?: string;
}