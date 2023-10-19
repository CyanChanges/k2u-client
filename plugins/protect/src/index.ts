import {Context, Schema} from 'koishi'
import K2Protect from '@k2u/protect'

class SecurityError extends Error {
}

export const name = 'protect'

export class NodeK2Protect extends K2Protect {
  constructor(protected ctx: Context) {
    super(ctx);
  }

  check(ctx: Context, immediate: boolean = false) {
    return false
  }

  checkThrow(ctx: Context, immediate: boolean = false) {
    if (this.check(ctx, immediate)) throw 'Security Error'
    return false as const
  }
}


export namespace NodeK2Protect {
  export interface Config {
  }

  export const Config: Schema<Config> = Schema.object({})
}

export default NodeK2Protect
