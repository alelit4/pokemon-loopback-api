import {Repository} from '@loopback/repository';
import {Pokemon} from '../models';

export interface PokemonRepository extends Repository<Pokemon>{
}