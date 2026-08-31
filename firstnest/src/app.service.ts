import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const text ="Devonshire Lodge (Low-Martin House), Windsor, Ontario, Canada. Commissioned by the rum-runner Harry Low in 1927, the building was designed in the style of a Cotswold cottage and completed in 1928. It served as of Member of Parliament Paul Martin Sr. for almost three decades. It was designated under the Ontario Heritage Act in 2008.  "
    return `Hello Nest World! ${text}`;
  }
}
