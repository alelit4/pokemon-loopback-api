import {Count, CountSchema} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {service} from '@loopback/core';
import {PokemonFinderUsecase} from '../usecases';
import {Pokemon} from '../domain/entities';

export class PokemonController {
  constructor(
    @service(PokemonFinderUsecase)
    public pokemonFinder: PokemonFinderUsecase,
  ) {
  }

  @get('/pokemon/count')
  @response(200, {
    description: 'Pokemon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(): Promise<Count> {
    return this.pokemonFinder.count();
  }

  @get('/pokemon')
  @response(200, {
    description: 'Array of Pokemon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pokemon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string('name') name?: string,
    @param.query.boolean('favourite') favourite?: boolean,
    @param.query.number('page') page?: number,
    @param.query.number('size') size?: number,
  ): Promise<Pokemon[]> {
    return this.pokemonFinder.findByParams(name, favourite, page, size);
  }

}
