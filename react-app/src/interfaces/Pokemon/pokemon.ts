// interface to represent the pokemon data type:
// for now, not including all data attributes, but can add more
// as we need them:
export interface IPokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
    }

}