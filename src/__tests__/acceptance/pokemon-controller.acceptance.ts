import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {PokemonApiLoopbackApplication} from '../../application';
import {
  cleanDatabase,
  fillDatabaseWithAllData,
  givenEmptyDatabase,
} from '../helpers/datasource.helper';
import {testdb} from '../helpers';
import {
  aBulbasaur,
  anSquirtle,
  aPikachu,
  aRaichu,
} from '../helpers/pokemon-test-helper';

describe('Pokemon controller should ', () => {
  let app: PokemonApiLoopbackApplication;
  let client: Client;

  before(givenEmptyDatabase);
  before(givenRunningApp);
  beforeEach(cleanDatabase);
  beforeEach(fillDatabaseWithAllData);
  after(async () => {
    await app.stop();
  });

  it('retrieve all pokemon when no filter added', async () => {
    const response = await client.get('/pokemon/').expect(200);

    expect(response.body).to.has.length(4);
  });

  it('retrieve all pokemon when filter by part of the name like "chu" ', async () => {
    const queryName = 'chu';

    const response = await client.get(`/pokemon/name/${queryName}`).expect(200);

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aPikachu.id);
    expect(response.body[1].id).equal(aRaichu.id);
  });

  it('retrieve a pokemon when filter by complete name', async () => {
    const queryName = 'Pikachu';

    const response = await client.get(`/pokemon/name/${queryName}`).expect(200);

    expect(response.body).to.has.length(1);
    expect(response.body[0].id).equal(aPikachu.id);
  });

  it('retrieve [404] HTTP Error response when filter by unreal name', async () => {
    const queryName = 'Pikachuuuu';

    await client.get(`/pokemon/name/${queryName}`).expect(404);
  });

  it('retrieve [422] HTTP Error response when try to filter by a name that contains numbers', async () => {
    const queryName = '111';

    await client.get(`/pokemon/name/${queryName}`).expect(422);
  });

  it('retrieve 1 page of size 2 when filter paginated', async () => {
    const queryPage = '1';
    const querySize = '2';

    const response = await client.get(
      `/pokemon?page=${queryPage}&size=${querySize}`,
    );

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aBulbasaur.id);
    expect(response.body[1].id).equal(anSquirtle.id);
  });

  it('retrieve 2 pages of size 2 when filter paginated', async () => {
    const queryPage = '2';
    const querySize = '2';

    const response = await client.get(
      `/pokemon?page=${queryPage}&size=${querySize}`,
    );

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aPikachu.id);
    expect(response.body[1].id).equal(aRaichu.id);
  });

  it('retrieve all favorite pokemon when filter favorite is activated', async () => {
    const queryFavourite = true;

    const response = await client.get(`/pokemon?favourite=${queryFavourite}`);

    expect(response.body).to.has.length(3);
    expect(response.body[0].id).equal(anSquirtle.id);
    expect(response.body[1].id).equal(aPikachu.id);
    expect(response.body[2].id).equal(aRaichu.id);
  });

  it('retrieve all no favorite pokemon when filter favorite is disabled', async () => {
    const queryFavourite = false;

    const response = await client.get(`/pokemon?favourite=${queryFavourite}`);

    expect(response.body).to.has.length(1);
    expect(response.body[0].id).equal(aBulbasaur.id);
  });

  it('retrieve all pokemon when filter by type when type is part of a type', async () => {
    const queryType = 'Elec';

    const response = await client.get(`/pokemon?type=${queryType}`);

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aPikachu.id);
    expect(response.body[1].id).equal(aRaichu.id);
  });

  it('retrieve all pokemon filter by type', async () => {
    const queryType = 'Grass';

    const response = await client.get(`/pokemon?type=${queryType}`);

    expect(response.body).to.has.length(1);
    expect(response.body[0].id).equal(aBulbasaur.id);
  });

  it('retrieve [404] HTTP Error response when filter by a non-existent type', async () => {
    const queryType = 'GrassPoison';

    await client.get(`/pokemon?type=${queryType}`).expect(404);
  });

  it('retrieve a pokemon filter by id', async () => {
    const queryId = aBulbasaur.id;

    const response = await client.get(`/pokemon/${queryId}`);

    expect(response.body.id).equal(aBulbasaur.id);
  });

  it('retrieve [422] HTTP Error response when filter by a no valid format id', async () => {
    const queryId = 'aFakeID';

    await client.get(`/pokemon/${queryId}`).expect(422);
  });

  it('retrieve [404] HTTP Error response when filter by a non-existent id', async () => {
    const queryId = '0001';

    await client.get(`/pokemon/${queryId}`).expect(404);
  });

  it('retrieve a pokemon marked as favourite', async () => {
    const queryId = aBulbasaur.id;
    const queryFavourite = true;

    await client.put(`/pokemon/favourite/${queryId}?mark=${queryFavourite}`);

    const pokemonResponse = await client.get(`/pokemon/${queryId}`);
    expect(pokemonResponse.body.id).equal(aBulbasaur.id);
    expect(pokemonResponse.body.favourite).equal(queryFavourite);
  });

  it('retrieve a pokemon unmarked as favourite', async () => {
    const queryId = aPikachu.id;
    const queryFavourite = false;

    await client.put(`/pokemon/favourite/${queryId}?mark=${queryFavourite}`);

    const pokemonResponse = await client.get(`/pokemon/${queryId}`);
    expect(pokemonResponse.body.id).equal(aPikachu.id);
    expect(pokemonResponse.body.favourite).equal(queryFavourite);
  });

  it('retrieve a pokemon with favourite attribute mutate', async () => {
    const queryId = aBulbasaur.id;

    await client.put(`/pokemon/favourite/${queryId}`);

    const pokemonResponse = await client.get(`/pokemon/${queryId}`);
    expect(pokemonResponse.body.id).equal(aBulbasaur.id);
    expect(pokemonResponse.body.favourite).equal(!aBulbasaur.favourite);
  });

  it('retrieve all pokemon when filter by part of a pokemon name', async () => {
    const queryName = 'chu';

    const response = await client.get(`/pokemon/name/${queryName}`).expect(200);

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aPikachu.id);
    expect(response.body[1].id).equal(aRaichu.id);
  });

  it('retrieve a pokemon when filter by a complete name', async () => {
    const queryName = 'Pikachu';

    const response = await client.get(`/pokemon/name/${queryName}`).expect(200);

    expect(response.body).to.has.length(1);
    expect(response.body[0].id).equal(aPikachu.id);
  });

  it('retrieve [404] HTTP Error response when filter by a non-existent pokemon name', async () => {
    const queryName = 'Pikachuuuu';

    await client.get(`/pokemon/name/${queryName}`).expect(404);
  });

  it('retrieve all pokemon types', async () => {
    const response = await client.get(`/pokemon/types`);

    expect(response.body).to.has.length(4);
  });

  async function givenRunningApp() {
    app = new PokemonApiLoopbackApplication({
      rest: {
        port: 0,
      },
    });
    await app.boot();
    app.dataSource(testdb);
    await app.start();
    client = createRestAppClient(app);
  }
});
