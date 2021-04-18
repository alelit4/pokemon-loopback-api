import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {PokemonApiLoopbackApplication} from '../../application';
import {givenEmptyDatabase, givenPokemon} from '../helpers/datasource.helper';
import {testdb} from '../helpers';

describe('Pokemon controller should ', () => {
  let app: PokemonApiLoopbackApplication;
  let client: Client;

  before(givenEmptyDatabase);
  before(givenRunningApp);
  after(async () => {
    await app.stop();
  });

  it('retrieves pokemon count', async () => {
    await givenPokemon({
      id: 'a-pokemon-id',
      name: 'a-pokemon-name2',
      classification: 'a-pokemon-classification2',
      favourite: true,
      types: ['type'],
    });

    const response = await client.get('/pokemon/count');

    expect(response.body.count).to.equal( 1);
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
