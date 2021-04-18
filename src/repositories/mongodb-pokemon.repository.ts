import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pokemon, PokemonRelations} from '../domain/entities';
import {PokemonRepository} from '../domain/repositories/pokemon.repository';

export class MongodbPokemonRepository extends DefaultCrudRepository<Pokemon,
  typeof Pokemon.prototype._id,
  PokemonRelations> implements PokemonRepository {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Pokemon, dataSource);
  }

}
