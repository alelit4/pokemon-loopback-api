import {MongodbPokemonRepository} from '../../repositories';
import {testdb} from './test-database.datasource';
import {Pokemon} from '../../domain/entities';
import {aBulbasaur, anSquirtle, aPikachu, aRaichu} from './pokemon-test-helper';

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
      types: ['a-pokemon-type', 'other-pokemon-type'],
    },
    data,
  );
}

export async function givenPokemon(data?: Partial<Pokemon>) {
  return new MongodbPokemonRepository(testdb).create(givenPokemonData(data));
}

export async function addPokemon(
  repository: MongodbPokemonRepository,
  data?: Partial<Pokemon>,
) {
  return repository.create(givenPokemonData(data));
}

export async function fillDatabaseWithAllData() {
  await givenPokemon(aBulbasaur);
  await givenPokemon(anSquirtle);
  await givenPokemon(aPikachu);
  await givenPokemon(aRaichu);
}
