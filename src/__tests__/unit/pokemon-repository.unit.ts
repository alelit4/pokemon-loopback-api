import {MongodbPokemonRepository} from '../../repositories';
import {expect} from '@loopback/testlab';
import {
  addPokemon,
  cleanDatabase,
  createEmptyTestRepository,
} from '../helpers/datasource.helper';
import {
  aBulbasaur,
  anSquirtle,
  aPikachu,
  aRaichu,
} from '../helpers/pokemon-test-helper';

describe('Pokemon repository should ', () => {
  const pokemonRepository: MongodbPokemonRepository = createEmptyTestRepository();

  beforeEach(cleanDatabase);

  it('retrieve pokemon count in database', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);

    const numberOfPokemons = await pokemonRepository.count();

    expect(numberOfPokemons.count).to.eql(1);
  });

  it('retrieve all pokemon when no params added', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, aPikachu);

    const response = await pokemonRepository.findByParams();

    expect(response.flat()).has.length(2);
  });

  it('retrieve all pokemon when param name is like "chu" part of the name', async () => {
    const paramName = 'chu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(paramName);

    expect(response.flat()).has.length(2);
    expect(response.flat()[0].id).equal(aPikachu.id);
    expect(response.flat()[1].id).equal(aRaichu.id);
  });

  it('retrieve Pikachu when param name is complete name', async () => {
    const paramName = 'Pikachu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(paramName);

    expect(response.flat()).has.length(1);
    expect(response.flat()[0].id).equal(aPikachu.id);
  });

  it('retrieve empty when param name is an unreal name', async () => {
    const paramName = 'PikaPika';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(paramName);

    expect(response.flat()).has.length(0);
  });

  it('retrieve pokemon skipping 1 and limit 2', async () => {
    const paramSkip = 1;
    const paramLimit = 2;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      undefined,
      paramSkip,
      paramLimit,
    );

    expect(response.flat()).has.length(2);
    expect(response.flat()[0].id).equal(anSquirtle.id);
    expect(response.flat()[1].id).equal(aPikachu.id);
  });

  it('retrieve pokemon skipping 2 and limit 1', async () => {
    const paramSkip = 2;
    const paramLimit = 1;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      undefined,
      paramSkip,
      paramLimit,
    );

    expect(response.flat()).has.length(1);
    expect(response.flat()[0].id).equal(aPikachu.id);
  });

  it('retrieve favorite pokemon when favorite param is true', async () => {
    const paramFavorite = true;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      paramFavorite,
    );

    expect(response.flat()).has.length(3);
    expect(response.flat()[0].id).equal(anSquirtle.id);
    expect(response.flat()[1].id).equal(aPikachu.id);
    expect(response.flat()[2].id).equal(aRaichu.id);
  });

  it('retrieve a non favorite pokemon when favorite param is false', async () => {
    const paramFavorite = false;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      paramFavorite,
    );

    expect(response.flat()).has.length(1);
    expect(response.flat()[0].id).equal(aBulbasaur.id);
  });
});
