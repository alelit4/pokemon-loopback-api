import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {NoPokemon, Pokemon, PokemonRelations} from '../domain/entities';
import {PokemonRepository} from '../domain/repositories/pokemon.repository';

export class MongodbPokemonRepository
  extends DefaultCrudRepository<
    Pokemon,
    typeof Pokemon.prototype._id,
    PokemonRelations
  >
  implements PokemonRepository {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Pokemon, dataSource);
  }

  findByParams(
    name?: string,
    favourite?: boolean,
    type?: string,
    skip?: number,
    limit?: number,
  ): Promise<Pokemon[] | NoPokemon> {
    return this.find({
      where: {
        name: name ? {regexp: new RegExp('.*' + name + '.*', 'i')} : undefined,
        favourite,
        types: type ? {regexp: new RegExp('.*' + type + '.*', 'i')} : undefined,
      },
      skip: skip,
      limit: limit,
      order: ['id ASC'],
    }).then(pokemon => {
      if (!pokemon.length) return new NoPokemon();
      return pokemon;
    });
  }

  findOneById(id: string): Promise<Pokemon | NoPokemon> {
    return this.findOne({
      where: {
        id: id,
      },
    }).then(pokemon => {
      if (!pokemon) return new NoPokemon();
      return pokemon;
    });
  }

  findByName(name?: string): Promise<Pokemon[] | NoPokemon> {
    return this.find({
      where: {
        name: name ? {regexp: new RegExp('.*' + name + '.*', 'i')} : undefined,
      },
    }).then(pokemon => {
      if (!pokemon.length) return new NoPokemon();
      return pokemon;
    });
  }

  async markAsFavourite(
    id: string,
    favourite?: boolean,
  ): Promise<void | NoPokemon> {
    const pokemon = await this.findOneById(id);
    if (pokemon instanceof NoPokemon) return new NoPokemon();
    pokemon.favourite = favourite ? favourite : !pokemon.favourite;
    return this.updateById(pokemon._id, {...pokemon});
  }

  async findDistinctTypes(): Promise<string[] | NoPokemon> {
    return this.find().then(pokemons => {
      if (!pokemons.length) return new NoPokemon();
      return [...new Set(pokemons.flatMap(pokemon => pokemon.types))];
    });
  }
}
