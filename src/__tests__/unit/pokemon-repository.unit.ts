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

  it('retrieve all pokemon when no params', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByParams();

    expect(response.flat()).has.length(4);
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

  it('retrieve pokemon by type when type is part of a type', async () => {
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

    expect(response.flat()).has.length(2);
    expect(response.flat()[0].id).equal(aPikachu.id);
    expect(response.flat()[1].id).equal(aRaichu.id);
  });

  it('retrieve a pokemon by type', async () => {
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

    expect(response.flat()).has.length(1);
    expect(response.flat()[0].id).equal(aBulbasaur.id);
  });

  it('retrieve empty when type is not a real type', async () => {
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

    expect(response.flat()).has.length(0);
  });

  it('retrieve a pokemon by id', async () => {
    const paramId = '001';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findOneById(paramId);

    expect(response.id).to.equal(paramId);
  });

  it('retrieve a http error when the id does not exist', async () => {
    const paramId = '001001';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    await pokemonRepository.findOneById(paramId).catch(exception => {
      expect(exception).instanceOf(Error);
    });
  });

  it('retrieve a pokemon marked as favourite', async () => {
    const paramFavourite = true;
    const paramId = '001';
    await addPokemon(pokemonRepository, aBulbasaur);

    await pokemonRepository.markAsFavourite(paramId, paramFavourite);

    const response = await pokemonRepository.findOneById(paramId);
    expect(response.id).to.equal(paramId);
    expect(response.favourite).to.equal(paramFavourite);
  });

  it('retrieve a pokemon marked as not favourite', async () => {
    const paramFavourite = false;
    const paramId = '002';
    await addPokemon(pokemonRepository, anSquirtle);

    await pokemonRepository.markAsFavourite(paramId, paramFavourite);

    const response = await pokemonRepository.findOneById(paramId);
    expect(response.id).to.equal(paramId);
    expect(response.favourite).to.equal(paramFavourite);
  });

  it('retrieve a error when a pokemon marked as favourite does not exist', async () => {
    const paramFavourite = false;
    const paramId = '001';
    await addPokemon(pokemonRepository, anSquirtle);

    await pokemonRepository
      .markAsFavourite(paramId, paramFavourite)
      .catch(exception => {
        expect(exception).instanceOf(Error);
      });
  });

  it('retrieve a pokemon with favourite mutation when no paramFavourite exist', async () => {
    const paramId = '002';
    await addPokemon(pokemonRepository, anSquirtle);

    await pokemonRepository.markAsFavourite(paramId);

    const response = await pokemonRepository.findOneById(paramId);
    expect(response.id).to.equal(paramId);
    expect(response.favourite).to.equal(!anSquirtle.favourite);
  });

  it('retrieve a error when favourite mutation is applied on a non-existent pokemon', async () => {
    const paramId = '000';
    await addPokemon(pokemonRepository, anSquirtle);

    await pokemonRepository.markAsFavourite(paramId).catch(exception => {
      expect(exception).instanceOf(Error);
    });
  });

  it('retrieve all pokemon when find by part of the name', async () => {
    const paramName = 'chu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByName(paramName);

    expect(response.flat()).has.length(2);
    expect(response.flat()[0].id).equal(aPikachu.id);
    expect(response.flat()[1].id).equal(aRaichu.id);
  });

  it('retrieve a pokemon when find by a name', async () => {
    const paramName = 'Pikachu';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByName(paramName);

    expect(response.flat()).has.length(1);
    expect(response.flat()[0].id).equal(aPikachu.id);
  });

  it('retrieve empty when find by unreal name', async () => {
    const paramName = 'PikaPika';
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findByName(paramName);

    expect(response.flat()).has.length(0);
  });

  it('retrieve all pokemon types', async () => {
    await addPokemon(pokemonRepository, aBulbasaur);
    await addPokemon(pokemonRepository, anSquirtle);
    await addPokemon(pokemonRepository, aPikachu);
    await addPokemon(pokemonRepository, aRaichu);

    const response = await pokemonRepository.findDistinctTypes();

    expect(response.flat()).has.length(4);
  });

  it('retrieve a error when there is any pokemon type', async () => {
    await pokemonRepository.findDistinctTypes().catch(exception => {
      expect(exception).instanceOf(Error);
    });
  });
});
