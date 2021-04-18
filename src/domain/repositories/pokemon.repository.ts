import {Count, Repository} from '@loopback/repository';
import {Pokemon} from '../entities';

export interface PokemonRepository extends Repository<Pokemon> {
  count(): Promise<Count>;

  findByParams(
    name?: string,
    favourite?: boolean,
    skip?: number,
    limit?: number,
  ): Promise<Pokemon[]>;
}
