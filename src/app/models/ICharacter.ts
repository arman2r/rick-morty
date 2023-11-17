export interface IPaginate {
    info?: IPropertiesPaginate;
    results?: Array<ICharacter>
}

export interface IPropertiesPaginate {
    count?: number,
    pages?: number,
    next?: string,
    prev?: string
}
 

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

export interface IOrigin{ 
    name: string,
    url: string
}

export interface ILocation {
    name: string,
    url: string
}
 