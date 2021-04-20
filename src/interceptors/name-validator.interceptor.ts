import {
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';

@injectable({tags: {key: NameValidatorInterceptor.BINDING_KEY}})
export class NameValidatorInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${NameValidatorInterceptor.name}`;

  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    let pokemonName: string | undefined;
    if (
      invocationCtx.methodName === 'find' ||
      invocationCtx.methodName === 'findByName'
    )
      pokemonName = invocationCtx.args[0];
    if (pokemonName && !this.isValidName(pokemonName)) {
      throw new HttpErrors['422']('Invalid Pokemon name');
    }
    return next();
  }

  isValidName(name: string): Boolean {
    return /^[a-z]+$/i.test(name) && name.length < 30;
  }
}
