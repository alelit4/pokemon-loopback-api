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
import {NoPokemon, Pokemon} from '../../domain/entities';

describe('Pokemon repository should ', () => {
  const pokemonRepository: MongodbPokemonRepository = createEmptyTestRepository();

  beforeEach(cleanDatabase);

  it('retrieve pokemon count in database', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);

    const numberOfPokemons = await pokemonRepository.count();

    expect(numberOfPokemons.count).to.eql(1);
  });

  it('retrieve all pokemon when filter without params', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, aPikachu);

    const response = await pokemonRepository.findByParams();

    expect((response as Pokemon[]).flat()).has.length(2);
  });

  it('retrieve all pokemon when filter by part of a name as param', async () => {
    const paramName = 'chu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(paramName);

    expect(response as Pokemon[]).has.length(2);
    expect((response as Pokemon[])[0].id).equal(aPikachu.id);
    expect((response as Pokemon[])[1].id).equal(aRaichu.id);
  });

  it('retrieve a pokemon when filter by a complete pokemon name as param', async () => {
    const paramName = 'Pikachu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(paramName);

    expect(response as Pokemon[]).has.length(1);
    expect((response as Pokemon[])[0].id).equal(aPikachu.id);
  });

  it('retrieve NoPokemon when filter by a non-existent name as param', async () => {
    const paramName = 'PikaPika';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(paramName);

    expect(response).instanceOf(NoPokemon);
  });

  it('retrieve all pokemon when no params', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams();

    expect(response as Pokemon[]).has.length(4);
  });

  it('retrieve all pokemon when filter with pagination skipping 1 and limit 2', async () => {
    const paramSkip = 1;
    const paramLimit = 2;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      undefined,
      undefined,
      paramSkip,
      paramLimit,
    );

    expect(response as Pokemon[]).has.length(2);
    expect((response as Pokemon[])[0].id).equal(anSquirtle.id);
    expect((response as Pokemon[])[1].id).equal(aPikachu.id);
  });

  it('retrieve all pokemon when filter with pagination skipping 2 and limit 1', async () => {
    const paramSkip = 2;
    const paramLimit = 1;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      undefined,
      undefined,
      paramSkip,
      paramLimit,
    );

    expect(response as Pokemon[]).has.length(1);
    expect((response as Pokemon[])[0].id).equal(aPikachu.id);
  });

  it('retrieve all favorite pokemon when filter by favorite', async () => {
    const paramFavorite = true;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      paramFavorite,
    );

    expect(response as Pokemon[]).has.length(3);
    expect((response as Pokemon[])[0].id).equal(anSquirtle.id);
    expect((response as Pokemon[])[1].id).equal(aPikachu.id);
    expect((response as Pokemon[])[2].id).equal(aRaichu.id);
  });

  it('retrieve all non favorite pokemon when filter by non-favorite', async () => {
    const paramFavorite = false;
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      paramFavorite,
    );

    expect(response as Pokemon[]).has.length(1);
    expect((response as Pokemon[])[0].id).equal(aBulbasaur.id);
  });

  it('retrieve all pokemon by type when filter by part of a type', async () => {
    const paramType = 'Elec';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      undefined,
      paramType,
    );

    expect(response as Pokemon[]).has.length(2);
    expect((response as Pokemon[])[0].id).equal(aPikachu.id);
    expect((response as Pokemon[])[1].id).equal(aRaichu.id);
  });

  it('retrieve all pokemon by type when filter by a type', async () => {
    const paramType = 'Grass';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      undefined,
      paramType,
    );

    expect(response as Pokemon[]).has.length(1);
    expect((response as Pokemon[])[0].id).equal(aBulbasaur.id);
  });

  it('retrieve noPokemon when filter by a non-existent type', async () => {
    const paramType = 'GrassPoison';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams(
      undefined,
      undefined,
      paramType,
    );

    expect(response).instanceOf(NoPokemon);
  });

  it('retrieve a pokemon when filter by id', async () => {
    const paramId = '001';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findOneById(paramId);

    expect(response.id).to.equal(paramId);
  });

  it('retrieve a noPokemon when when filter by a non-existent id', async () => {
    const paramId = '001001';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findOneById(paramId);
    expect(response).instanceOf(NoPokemon);
  });

  it('retrieve a pokemon marked as favourite', async () => {
    const paramFavourite = true;
    const paramId = '001';
    await addPokemon(pokemonRepository, aBulbasaur);

    await pokemonRepository.markAsFavourite(paramId, paramFavourite);

    const response = await pokemonRepository.findOneById(paramId);
    expect(response.id).to.equal(paramId);
    expect((response as Pokemon).favourite).to.equal(paramFavourite);
  });

  it('retrieve a pokemon marked as not favourite', async () => {
    const paramFavourite = false;
    const paramId = '002';
    await addPokemon(pokemonRepository, anSquirtle);

    await pokemonRepository.markAsFavourite(paramId, paramFavourite);

    const response = await pokemonRepository.findOneById(paramId);
    expect(response.id).to.equal(paramId);
    expect((response as Pokemon).favourite).to.equal(paramFavourite);
  });

  it('retrieve a noPokemon when a pokemon marked as favourite does not exist', async () => {
    const paramFavourite = false;
    const paramId = '001';
    await addPokemon(pokemonRepository, anSquirtle);

    const response = await pokemonRepository.markAsFavourite(
      paramId,
      paramFavourite,
    );

    expect(response).instanceOf(NoPokemon);
  });

  it('retrieve a pokemon with favourite mutation when no favourite param exist', async () => {
    const paramId = '002';
    await addPokemon(pokemonRepository, anSquirtle);

    await pokemonRepository.markAsFavourite(paramId);

    const response = await pokemonRepository.findOneById(paramId);
    expect(response.id).to.equal(paramId);
    expect((response as Pokemon).favourite).to.equal(!anSquirtle.favourite);
  });

  it('retrieve a noPokemon when favourite mutation is applied on a non-existent pokemon', async () => {
    const paramId = '000';
    await addPokemon(pokemonRepository, anSquirtle);

    const response = await pokemonRepository.markAsFavourite(paramId);

    expect(response).instanceOf(NoPokemon);
  });

  it('retrieve all pokemon when filter by part of the name', async () => {
    const paramName = 'chu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByName(paramName);

    expect(response as Pokemon[]).has.length(2);
    expect((response as Pokemon[])[0].id).equal(aPikachu.id);
    expect((response as Pokemon[])[1].id).equal(aRaichu.id);
  });

  it('retrieve a pokemon when filter by a name', async () => {
    const paramName = 'Pikachu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByName(paramName);

    expect(response as Pokemon[]).has.length(1);
    expect((response as Pokemon[])[0].id).equal(aPikachu.id);
  });

  it('retrieve NoPokemon when filter by a non-existent name', async () => {
    const paramName = 'PikaPika';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByName(paramName);

    expect(response).instanceOf(NoPokemon);
  });

  it('retrieve all pokemon types', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findDistinctTypes();

    expect((response as string[]).flat()).has.length(4);
  });

  it('retrieve a error when there is any pokemon type', async () => {
    const response = await pokemonRepository.findDistinctTypes();

    expect(response).instanceOf(NoPokemon);
  });
});
