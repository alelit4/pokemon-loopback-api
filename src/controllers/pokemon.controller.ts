import {Count, CountSchema} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  put,
  response,
} from '@loopback/rest';
import {service} from '@loopback/core';
import {FavouriteMarkerUsecase, FinderUsecase} from '../usecases';
import {Pokemon} from '../domain/entities';
import {TypeFinderUsecase} from '../usecases/pokemon/type-finder.usecase';

export class PokemonController {
  constructor(
    @service(FinderUsecase)
    public pokemonFinder: FinderUsecase,
    @service(FavouriteMarkerUsecase)
    public favouriteMarker: FavouriteMarkerUsecase,
    @service(TypeFinderUsecase)
    public typeFinder: TypeFinderUsecase,
  ) {}

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
    @param.query.string('type') type?: string,
    @param.query.number('page') page?: number,
    @param.query.number('size') size?: number,
  ): Promise<Pokemon[]> {
    return this.pokemonFinder.findByParams(name, favourite, type, page, size);
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
  async findById(@param.path.string('id') id?: string): Promise<Pokemon> {
    try {
      const aPokemon = this.pokemonFinder.findOneById(id);
      return await aPokemon;
    } catch (e) {
      throw new HttpErrors.NotFound('Pokemon does not exist!');
    }
  }

  @get('/pokemon/{name}')
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
  async findByName(
    @param.path.string('name') name?: string,
  ): Promise<Pokemon[]> {
    return this.pokemonFinder.findByName(name);
  }

  @put('/pokemon/favourite/{id}')
  @response(200, {
    description: 'Pokemon updated model instance',
  })
  async mutateFavouriteById(
    @param.path.string('id') id?: string,
    @param.query.boolean('mark') mark?: boolean,
  ): Promise<void> {
    try {
      if (mark)
        return await this.favouriteMarker.markAsFavourite(id, mark.valueOf());
      return await this.favouriteMarker.mutateFavourite(id);
    } catch (e) {
      throw new HttpErrors.NotFound('Pokemon does not exist!');
    }
  }

  @get('/pokemon/types')
  @response(200, {
    description: 'Array of Pokemon types instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: 'string',
        },
      },
    },
  })
  async findTypes(): Promise<string[] | void[]> {
    return this.typeFinder.findDistinctTypes();
  }
}
