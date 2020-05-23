import { ContentDoc } from './ContentDoc.interface';

export interface ColumnContentDoc extends ContentDoc {
    Width: number | BootstrapMediaDefinition | undefined
    Content: ContentDoc[]
}

export type BootstrapBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BootstrapMediaDefinition = {
    [key in BootstrapBreakpoint]?: number
}