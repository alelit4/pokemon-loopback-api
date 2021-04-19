import {Count, Repository} from '@loopback/repository';
import {Pokemon} from '../entities';

export interface PokemonRepository extends Repository<Pokemon> {
  count(): Promise<Count>;

  findByParams(
    name?: string,
    favourite?: boolean,
    type?: string,
    skip?: number,
    limit?: number,
  ): Promise<Pokemon[]>;

  findOneById(id?: string): Promise<Pokemon>;

  findByName(name?: string): Promise<Pokemon[]>;

  markAsFavourite(id?: string, favourite?: boolean): Promise<void>;
}
