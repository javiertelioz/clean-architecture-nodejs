import { Resolver, Query, Arg } from 'type-graphql';

import { Hello } from './hello.input';
import SayHello from '../../../application/use_cases/hello/say-hello';

@Resolver(Hello)
export class HelloResolver {
  @Query(returns => Hello)
  async sayHello(@Arg('name') name: string) {
    return { message: SayHello(name) } as Hello;
  }
}
