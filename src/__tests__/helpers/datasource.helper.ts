import {MongodbPokemonRepository} from '../../repositories';
import {testdb} from './test-database.datasource';
import {Pokemon} from '../../domain/entities';

export function createEmptyTestRepository() {
  return new MongodbPokemonRepository(testdb);
}

export async function givenEmptyDatabase() {
  await new MongodbPokemonRepository(testdb).deleteAll();
}

export async function cleanDatabase() {
  await new MongodbPokemonRepository(testdb).deleteAll();
}

export function givenPokemonData(data?: Partial<Pokemon>) {
  return Object.assign(
    {
      id: 'a-pokemon-id',
      name: 'a-pokemon-name',
      classification: 'a-pokemon-classification',
      favourite: true,
      type: ['a-pokemon-type', 'other-pokemon-type'],
    },
    data,
  );
}

export async function addPokemon(repository: MongodbPokemonRepository, data?: Partial<Pokemon>) {
  return repository.create(givenPokemonData(data));
}