import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  put,
  response,
} from '@loopback/rest';
import {intercept, service} from '@loopback/core';
import {FavouriteMarkerUsecase, FinderUsecase} from '../usecases';
import {NoPokemon, Pokemon} from '../domain/entities';
import {TypeFinderUsecase} from '../usecases';
import {NameValidatorInterceptor} from '../interceptors';
import {IdValidatorInterceptor} from '../interceptors/id-validator.interceptor';

export class PokemonController {
  constructor(
    @service(FinderUsecase)
    public pokemonFinder: FinderUsecase,
    @service(FavouriteMarkerUsecase)
    public favouriteMarker: FavouriteMarkerUsecase,
    @service(TypeFinderUsecase)
    public typeFinder: TypeFinderUsecase,
  ) {}

  @intercept(NameValidatorInterceptor.BINDING_KEY)
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
  ): Promise<Pokemon[] | NoPokemon> {
    return this.pokemonFinder.findByParams(name, favourite, type, page, size);
  }

  @intercept(IdValidatorInterceptor.BINDING_KEY)
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
    @param.path.string('id') id?: string,
  ): Promise<Pokemon | NoPokemon> {
    try {
      const aPokemon = this.pokemonFinder.findOneById(id);
      return await aPokemon;
    } catch (exception) {
      throw new HttpErrors.NotFound('Pokemon does not exist!');
    }
  }

  @intercept(NameValidatorInterceptor.BINDING_KEY)
  @get('/pokemon/name/{name}')
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
  ): Promise<Pokemon[] | NoPokemon> {
    return this.pokemonFinder.findByName(name);
  }

  @intercept(IdValidatorInterceptor.BINDING_KEY)
  @put('/pokemon/favourite/{id}')
  @response(204, {
    description: 'Pokemon updated model instance',
  })
  async mutateFavouriteById(
    @param.path.string('id') id?: string,
    @param.query.boolean('mark') mark?: boolean,
  ): Promise<void | NoPokemon> {
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
  async findTypes(): Promise<string[] | NoPokemon> {
    return this.typeFinder.findDistinctTypes();
  }
}
