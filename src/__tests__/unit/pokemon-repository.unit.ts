import {Pokemon} from '../../domain/entities';
import {MongodbPokemonRepository} from '../../repositories';
import {expect} from '@loopback/testlab';
import {addPokemon, cleanDatabase, createEmptyTestRepository} from '../helpers/datasource.helper';

describe('Pokemon repository should ', () => {

  const pokemonRepository: MongodbPokemonRepository = createEmptyTestRepository();
  const aPokemon = {
    'id': '001',
    'name': 'Bulbasaur',
    'classification': 'Seed Pokémon',
    'favourite': true,
    'types': [
      'Grass',
      'Poison',
    ],
  } as Pokemon;

  before(() => cleanDatabase() );

  it('retrieves the number of pokemons in database', async () => {
    await addPokemon(pokemonRepository, aPokemon)

    const numberOfPokemons = await pokemonRepository.count();

    expect(numberOfPokemons.count).to.eql(1);
  });

});
