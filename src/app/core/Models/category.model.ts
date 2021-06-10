import { Resource } from "./resource.model";

export interface Category extends Resource {
    name: string,
    main: number,
}
