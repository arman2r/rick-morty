import { ILocation } from "./ILocation";
import { IOrigin } from "./IOrigin";

export interface ICharacter {
    id: number;
    name: string;
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: IOrigin,
    location: ILocation,
    image: string,
    episode: Array<string>,
    url:string,
    created: string
}  
 