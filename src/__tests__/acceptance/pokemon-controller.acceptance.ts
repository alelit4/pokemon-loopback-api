import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {PokemonApiLoopbackApplication} from '../../application';
import {
  cleanDatabase,
  givenEmptyDatabase,
  givenPokemon,
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
  after(async () => {
    await app.stop();
  });

  it('retrieve pokemon count', async () => {
    await givenPokemon(aBulbasaur);

    const response = await client.get('/pokemon/count');

    expect(response.body.count).to.equal(1);
  });

  it('retrieve all pokemon when no filter added', async () => {
    await givenPokemon(aBulbasaur);
    await givenPokemon(aPikachu);

    const response = await client.get('/pokemon/');

    expect(response.body).to.has.length(2);
  });

  it('retrieve all pokemon when filter by part of the name like "chu" ', async () => {
    const queryName = 'chu';
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?name=${queryName}`);

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aPikachu.id);
    expect(response.body[1].id).equal(aRaichu.id);
  });

  it('retrieve Pikachu when filter by complete name', async () => {
    const queryName = 'Pikachu';
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?name=${queryName}`);

    expect(response.body).to.has.length(1);
    expect(response.body[0].id).equal(aPikachu.id);
  });

  it('retrieve empty when filter by unreal name', async () => {
    const queryName = 'Pikachuuuu';
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?name=${queryName}`);

    expect(response.body).to.has.length(0);
  });

  it('retrieve page 1 of size 2 when filter paginated', async () => {
    const queryPage = '1';
    const querySize = '2';
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(
      `/pokemon?page=${queryPage}&size=${querySize}`,
    );

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aBulbasaur.id);
    expect(response.body[1].id).equal(anSquirtle.id);
  });

  it('retrieve page 2 of size 2 when filter paginated', async () => {
    const queryPage = '2';
    const querySize = '2';
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(
      `/pokemon?page=${queryPage}&size=${querySize}`,
    );

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aPikachu.id);
    expect(response.body[1].id).equal(aRaichu.id);
  });

  it('retrieve favorite pokemon when filter favorite activated', async () => {
    const queryFavourite = true;
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?favourite=${queryFavourite}`);

    expect(response.body).to.has.length(3);
    expect(response.body[0].id).equal(anSquirtle.id);
    expect(response.body[1].id).equal(aPikachu.id);
    expect(response.body[2].id).equal(aRaichu.id);
  });

  it('retrieve no favorite pokemon when filter favorite is false', async () => {
    const queryFavourite = false;
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?favourite=${queryFavourite}`);

    expect(response.body).to.has.length(1);
    expect(response.body[0].id).equal(aBulbasaur.id);
  });

  it('retrieve pokemon by type when type is part of a type', async () => {
    const queryType = 'Elec';
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?type=${queryType}`);

    expect(response.body).to.has.length(2);
    expect(response.body[0].id).equal(aPikachu.id);
    expect(response.body[1].id).equal(aRaichu.id);
  });

  it('retrieve pokemon by type param', async () => {
    const queryType = 'Grass';
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?type=${queryType}`);

    expect(response.body).to.has.length(1);
    expect(response.body[0].id).equal(aBulbasaur.id);
  });

  it('retrieve empty when type param is not a real type', async () => {
    const queryType = 'GrassPoison';
    await givenPokemon(aBulbasaur);
    await givenPokemon(anSquirtle);
    await givenPokemon(aPikachu);
    await givenPokemon(aRaichu);

    const response = await client.get(`/pokemon?type=${queryType}`);

    expect(response.body).to.has.length(0);
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
