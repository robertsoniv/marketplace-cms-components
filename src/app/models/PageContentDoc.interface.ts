export interface PageContentDoc {
    Url: string;
    SiteUrl: string;
    Title: string;
    Description: string;
    MetaImageUrl: string;
    DateLastUpdated: string;
    Active: boolean;
    ContentDocUrls: string[];
    HeaderEmbeds?: string
    FooterEmbeds?: string
    NavTitle?: string;
}