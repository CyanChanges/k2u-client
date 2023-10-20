import { Context, Logger, Service } from 'koishi'
import { clearInterval } from "timers";

declare module 'koishi' {
  interface Context {
    setInterval<T extends () => any>(func: T, ms: number, ...args: Parameters<T>): () => void

    setTimeout<T extends () => any>(func: T, ms: number, ...args: Parameters<T>): () => void
  }
}

class K2U extends Service {
  protected logger: Logger
  static readonly methods = ['setInterval', 'setTimeout']

  static symbol = Symbol.for('k2u.utils')

  constructor(protected ctx: Context) {
    super(ctx, 'k2u.utils', false)
    this.logger = ctx.logger("k2u.utils")
  }

  plugin() {

  }

  setInterval<T extends () => any>(func: T, ms: number, ...args: Parameters<T>) {
    const id = setInterval(func, ms, ...args)
    return this.caller.collect('interval', () => {
      clearInterval(id)
    })
  }

  setTimeout<T extends () => any>(func: T, ms: number, ...args: Parameters<T>) {
    const id = setTimeout(func, ms, ...args)
    return this.caller.collect('interval', () => {
      clearTimeout(id)
    })
  }

  start() {
    this.logger.info("OVER the end of VORTEX we took every breath to follow")
  }
}

export default K2U

Context.service('k2u.utils', K2U)
