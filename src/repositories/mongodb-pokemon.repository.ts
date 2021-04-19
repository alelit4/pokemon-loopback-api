import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pokemon, PokemonRelations} from '../domain/entities';
import {PokemonRepository} from '../domain/repositories/pokemon.repository';
import {HttpErrors} from '@loopback/rest';

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
  ): Promise<Pokemon[]> {
    return this.find({
      where: {
        name: name ? {regexp: new RegExp('.*' + name + '.*', 'i')} : undefined,
        favourite,
        types: type ? {regexp: new RegExp('.*' + type + '.*', 'i')} : undefined,
      },
      skip: skip,
      limit: limit,
    });
  }

  findOneById(id: string): Promise<Pokemon> {
    return this.findOne({
      where: {
        id: id,
      },
    }).then(pokemon => {
      if (!pokemon) throw new HttpErrors.NotFound('Pokemon does not exist!');
      return pokemon;
    });
  }

  findByName(name?: string): Promise<Pokemon[]> {
    return this.find({
      where: {
        name: name ? {regexp: new RegExp('.*' + name + '.*', 'i')} : undefined,
      },
    });
  }

  async markAsFavourite(id: string, favourite?: boolean): Promise<void> {
    const pokemon = await this.findOneById(id);
    if (!pokemon) throw new HttpErrors.NotFound('Pokemon does not exist!');
    pokemon.favourite = favourite ? favourite : !pokemon.favourite;
    return this.updateById(pokemon._id, {...pokemon});
  }

  async findDistinctTypes(): Promise<string[]> {
    const pokemonsWithType = await this.find({fields: {types: true}}, {});
    if (!pokemonsWithType)
      throw new HttpErrors.NotFound('No pokemon with types!');
    return [...new Set(pokemonsWithType.flatMap(pokemon => pokemon.types))];
  }
}
