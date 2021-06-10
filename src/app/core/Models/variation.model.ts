import { Resource } from "./resource.model";

export interface Variation extends Resource {
    color: string,
    thumbnailUrl: string,
    imageUrl: string,
    product: number
}
