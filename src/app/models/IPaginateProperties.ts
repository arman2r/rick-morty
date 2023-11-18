
import { IPropertiesPaginate } from "./IPaginate"; 
import { ICharacter } from "./ICharacter"; 

export interface IPaginate {
    info?: IPropertiesPaginate;
    results?: Array<ICharacter>
} 