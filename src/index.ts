import { Injectable, Injector } from 'static-injector';

@Injectable()
export class FirstClass {
  constructor() {}
  hello() {
    return 'hello';
  }
}

let injector = Injector.create({
  providers: [{ provide: FirstClass }],
});
let instance = injector.get(FirstClass);
console.log(instance.hello());
