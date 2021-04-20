import {
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';

@injectable({tags: {key: IdValidatorInterceptor.BINDING_KEY}})
export class IdValidatorInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${IdValidatorInterceptor.name}`;

  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    let pokemonID: string | undefined;
    if (
      invocationCtx.methodName === 'findById' ||
      invocationCtx.methodName === 'mutateFavouriteById'
    )
      pokemonID = invocationCtx.args[0];
    if (pokemonID && !this.isValidId(pokemonID)) {
      throw new HttpErrors['422']('Bad pokemon id format');
    }
    return next();
  }

  isValidId(name: string): Boolean {
    return /^[0-9]+$/i.test(name);
  }
}
