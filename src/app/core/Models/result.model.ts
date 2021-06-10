import { Resource } from "./resource.model";

export interface Result<T extends Resource> {
    count: number,
    hasNext: boolean,
    hasPrevious: boolean,
    results: T[]
}
