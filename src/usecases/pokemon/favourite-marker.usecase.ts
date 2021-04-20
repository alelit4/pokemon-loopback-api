import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {MongodbPokemonRepository} from '../../repositories';
import {PokemonRepository} from '../../domain/repositories/pokemon.repository';
import {repository} from '@loopback/repository';
import {NoPokemon} from '../../domain/entities';
import {HttpErrors} from '@loopback/rest';

@injectable({scope: BindingScope.TRANSIENT})
export class FavouriteMarkerUsecase {
  constructor(
    @repository(MongodbPokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  async mutateFavourite(id?: string) {
    const pokemon = await this.pokemonRepository.markAsFavourite(id);
    if (pokemon instanceof NoPokemon)
      throw new HttpErrors['404']('Pokemon no found');
    return pokemon;
  }

  async markAsFavourite(id?: string, favourite?: boolean) {
    const pokemon = await this.pokemonRepository.markAsFavourite(id, favourite);
    if (pokemon instanceof NoPokemon)
      throw new HttpErrors['404']('Pokemon no found');
    return pokemon;
  }
}
