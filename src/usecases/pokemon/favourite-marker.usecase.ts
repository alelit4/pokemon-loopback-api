import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {MongodbPokemonRepository} from '../../repositories';
import {PokemonRepository} from '../../domain/repositories/pokemon.repository';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class FavouriteMarkerUsecase {
  constructor(
    @repository(MongodbPokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  mutateFavourite(id?: string) {
    return this.pokemonRepository.markAsFavourite(id);
  }

  markAsFavourite(id?: string, favourite?: boolean) {
    return this.pokemonRepository.markAsFavourite(id, favourite);
  }
}
