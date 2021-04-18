import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pokemon} from '../models';
import {MongodbPokemonRepository} from '../repositories';

export class PokemonController {
  constructor(
    @repository(MongodbPokemonRepository)
    public mongodbPokemonRepository : MongodbPokemonRepository,
  ) {}

  @post('/pokemon')
  @response(200, {
    description: 'Pokemon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pokemon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {
            title: 'NewPokemon',
            exclude: ['id'],
          }),
        },
      },
    })
    pokemon: Omit<Pokemon, 'id'>,
  ): Promise<Pokemon> {
    return this.mongodbPokemonRepository.create(pokemon);
  }

  @get('/pokemon/count')
  @response(200, {
    description: 'Pokemon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pokemon) where?: Where<Pokemon>,
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

  @patch('/pokemon')
  @response(200, {
    description: 'Pokemon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
    @param.where(Pokemon) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.mongodbPokemonRepository.updateAll(pokemon, where);
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

  @patch('/pokemon/{id}')
  @response(204, {
    description: 'Pokemon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
  ): Promise<void> {
    await this.mongodbPokemonRepository.updateById(id, pokemon);
  }

  @put('/pokemon/{id}')
  @response(204, {
    description: 'Pokemon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pokemon: Pokemon,
  ): Promise<void> {
    await this.mongodbPokemonRepository.replaceById(id, pokemon);
  }

  @del('/pokemon/{id}')
  @response(204, {
    description: 'Pokemon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mongodbPokemonRepository.deleteById(id);
  }
}
