import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {MongodbPokemonRepository} from '../../repositories';
import {repository} from '@loopback/repository';
import {PokemonRepository} from '../../domain/repositories/pokemon.repository';
import {NoPokemon} from '../../domain/entities';
import {HttpErrors} from '@loopback/rest';

@injectable({scope: BindingScope.TRANSIENT})
export class TypeFinderUsecase {
  constructor(
    @repository(MongodbPokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  async findDistinctTypes() {
    const pokemon = await this.pokemonRepository.findDistinctTypes();
    if (pokemon instanceof NoPokemon)
      throw new HttpErrors['404']('Pokemon no found');
    return pokemon;
  }
}
