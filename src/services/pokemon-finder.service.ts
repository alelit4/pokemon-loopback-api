import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {MongodbPokemonRepository} from '../repositories';
import {PokemonRepository} from '../domain/repositories/pokemon.repository';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class PokemonFinderService {
  constructor(
    @repository(MongodbPokemonRepository)
    public pokemonRepository: PokemonRepository
  ) {}

  count() {
    return this.pokemonRepository.count();
  }
}
