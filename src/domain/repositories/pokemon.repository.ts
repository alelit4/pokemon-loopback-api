import {Count, Repository} from '@loopback/repository';
import {NoPokemon, Pokemon} from '../entities';

export interface PokemonRepository extends Repository<Pokemon> {
  count(): Promise<Count>;

  findByParams(
    name?: string,
    favourite?: boolean,
    type?: string,
    skip?: number,
    limit?: number,
  ): Promise<Pokemon[] | NoPokemon>;

  findOneById(id?: string): Promise<Pokemon | NoPokemon>;

  findByName(name?: string): Promise<Pokemon[] | NoPokemon>;

  markAsFavourite(id?: string, favourite?: boolean): Promise<void | NoPokemon>;

  findDistinctTypes(): Promise<string[] | NoPokemon>;
}
