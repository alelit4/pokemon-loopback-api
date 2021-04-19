import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {MongodbPokemonRepository} from '../../repositories';
import {repository} from '@loopback/repository';
import {PokemonRepository} from '../../domain/repositories/pokemon.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class TypeFinderUsecase {
  constructor(
    @repository(MongodbPokemonRepository)
    public pokemonRepository: PokemonRepository) {
  }

  findDistinctTypes() {
    return this.pokemonRepository.findDistinctTypes();
  }
}
