import {Context, Logger, Schema, Service} from 'koishi'

declare module 'koishi' {
  interface Context {
    'k2u.protect': K2Protect
  }
}

export abstract class K2Protect extends Service {
  protected logger: Logger

  constructor(protected ctx: Context) {
    super(ctx, 'k2u.protect');
    this.logger = ctx.logger('k2u.protect')
  }

  abstract checkThrow(ctx: Context, immediate: boolean): false | never

  abstract check(ctx: Context, immediate: boolean): boolean

  async start() {
    this.logger.info("Will howling tides give me something to hold.")
  }
}

export default K2Protect
