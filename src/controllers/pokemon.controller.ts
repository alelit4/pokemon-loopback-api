import {Count, CountSchema} from '@loopback/repository';
import {get, response} from '@loopback/rest';
import {service} from '@loopback/core';
import {PokemonFinderService} from '../services';

export class PokemonController {
  constructor(
    @service(PokemonFinderService)
    public pokemonFinder : PokemonFinderService,
  ) {}

  @get('/pokemon/count')
  @response(200, {
    description: 'Pokemon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
  ): Promise<Count> {
    return this.pokemonFinder.count();
  }

}
