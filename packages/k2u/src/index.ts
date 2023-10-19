import {Context, Logger, Plugin, Service} from 'koishi'

class K2U extends Service {
  protected logger: Logger

  static symbol = Symbol.for('k2u')

  constructor(protected ctx: Context) {
    super(ctx, 'k2u', false)
    this.logger = ctx.logger("k2u")
  }

  plugin() {

  }

  start() {
    this.logger.info("Let it unfold")
  }
}


Context.service('k2u', K2U)
