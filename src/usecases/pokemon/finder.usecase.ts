import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {MongodbPokemonRepository} from '../../repositories';
import {PokemonRepository} from '../../domain/repositories/pokemon.repository';
import {repository} from '@loopback/repository';
import {NoPokemon, Pokemon} from '../../domain/entities';
import {HttpErrors} from '@loopback/rest';

@injectable({scope: BindingScope.TRANSIENT})
export class FinderUsecase {
  constructor(
    @repository(MongodbPokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  count() {
    return this.pokemonRepository.count();
  }

  async findByParams(
    name?: string,
    favourite?: boolean,
    type?: string,
    page?: number,
    size?: number,
  ): Promise<Pokemon[] | NoPokemon> {
    const [skip, limit] = FinderUsecase.calculatePagination(page, size);
    const pokemon = await this.pokemonRepository.findByParams(
      name,
      favourite,
      type,
      skip,
      limit,
    );
    if (pokemon instanceof NoPokemon)
      throw new HttpErrors['404']('Pokemon no found');
    return pokemon;
  }

  private static calculatePagination(page?: number, size?: number) {
    const skip = page && size ? (page - 1) * size : 0;
    const limit = page && size ? size : undefined;
    return [skip, limit];
  }

  async findOneById(id?: string) {
    const pokemon = await this.pokemonRepository.findOneById(id);
    if (pokemon instanceof NoPokemon)
      throw new HttpErrors['404']('Pokemon no found');
    return pokemon;
  }

  async findByName(name?: string) {
    const pokemon = await this.pokemonRepository.findByName(name);
    if (pokemon instanceof NoPokemon)
      throw new HttpErrors['404']('Pokemon no found');
    return pokemon;
  }
}
