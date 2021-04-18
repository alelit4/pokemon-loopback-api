import {Count, CountSchema, Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {Pokemon} from '../domain/entities';
import {MongodbPokemonRepository} from '../repositories';

export class PokemonController {
  constructor(
    @repository(MongodbPokemonRepository)
    public mongodbPokemonRepository : MongodbPokemonRepository,
  ) {}

  @get('/pokemon/count')
  @response(200, {
    description: 'Pokemon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
  ): Promise<Count> {
    return this.mongodbPokemonRepository.count();
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
    @param.filter(Pokemon) filter?: Filter<Pokemon>,
  ): Promise<Pokemon[]> {
    return this.mongodbPokemonRepository.find(filter);
  }

  @get('/pokemon/{id}')
  @response(200, {
    description: 'Pokemon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pokemon, {exclude: 'where'}) filter?: FilterExcludingWhere<Pokemon>
  ): Promise<Pokemon> {
    return this.mongodbPokemonRepository.findById(id, filter);
  }

}
