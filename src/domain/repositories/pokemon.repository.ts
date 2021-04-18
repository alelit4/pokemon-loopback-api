import {Repository} from '@loopback/repository';
import {Pokemon} from '../entities';

export interface PokemonRepository extends Repository<Pokemon>{
}