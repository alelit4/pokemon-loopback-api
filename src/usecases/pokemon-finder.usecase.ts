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

}
