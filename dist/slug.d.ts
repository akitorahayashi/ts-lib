export interface SlugOptions {
    maxLength?: number;
    separator?: '-' | '_';
}
export declare function createSlug(input: string, options?: SlugOptions): string;
