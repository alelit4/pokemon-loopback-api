import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {MongodbPokemonRepository} from '../repositories';
import {PokemonRepository} from '../domain/repositories/pokemon.repository';
import {repository} from '@loopback/repository';
import {Pokemon} from '../domain/entities';

@injectable({scope: BindingScope.TRANSIENT})
export class PokemonFinderUsecase {
  constructor(
    @repository(MongodbPokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {
  }

  count() {
    return this.pokemonRepository.count();
  }

  findByParams(name?: string,  favourite?: boolean, page?: number, size?: number): Promise<Pokemon[]> {
    const [skip, limit] = PokemonFinderUsecase.calculatePagination(page, size);
    return this.pokemonRepository.findByParams(name, favourite, skip, limit);
  }

  private static calculatePagination(page?: number, size?: number) {
    const skip = page && size ? (page - 1) * size : 0;
    const limit = page && size ? size : undefined;
    return [skip, limit];
  }

}
