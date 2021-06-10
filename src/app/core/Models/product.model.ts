import { Brand } from './brand.model';
import { Category } from './category.model';
import { Resource } from './resource.model';
import { Variation } from './variation.model';
export interface Product extends Resource {
    brand: Brand | null,
    category: Category,
    variations: Variation[],
    name: string,
    currentPrice: string,
    rawPrice: string,
    likesCount: number,
    discount: number,
    isNew: boolean,
    model: string,
    url: string,
    imageUrl: string
}
