import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    mongodb: {collection: 'pokemons'},
  },
  name: 'pokemon',
})
export class Pokemon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 3,
      minLength: 1,
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 30,
      minLength: 1,
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 40,
      minLength: 1,
    },
  })
  classification: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  resistant?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  weaknesses?: string[];

  @property({
    type: 'object',
  })
  weight?: object;

  @property({
    type: 'object',
  })
  height?: object;

  @property({
    type: 'number',
  })
  fleeRate?: number;

  @property({
    type: 'object',
  })
  evolutionRequirements?: object;

  @property({
    type: 'array',
    itemType: 'object',
  })
  evolutions?: object[];

  @property({
    type: 'number',
  })
  maxCP?: number;

  @property({
    type: 'number',
    jsonSchema: {
      maximum: 5000,
      minimum: 0,
    },
  })
  maxHP?: number;

  @property({
    type: 'object',
  })
  attacks?: object;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  favourite: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  types: string[];

  constructor(data?: Partial<Pokemon>) {
    super(data);
  }
}

export interface PokemonRelations {
  // describe navigational properties here
}

export type PokemonWithRelations = Pokemon & PokemonRelations;

export class NoPokemon {
  id: null;
}
