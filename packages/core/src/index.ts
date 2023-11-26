import { Context, Logger, Service } from 'koishi'
import { Plugin, ForkScope, Registry } from 'cordis'
import { Get } from 'cosmokit'


class Module extends Service {
  static core?: K2U
  declare protected ctx: Context & { k2u: K2U }
  protected logger: Logger
  protected core: K2U

  constructor(ctx: Context, readonly key: string, immediate: boolean = false) {
    super(ctx, `k2u.${key}`, immediate);
    this.core = Module.core ?? ctx[K2U.symbol]
    this.logger = ctx.logger(`k2u.${key}`)
    this.ctx = Object.assign(ctx, { k2u: this.core })
  }
}

class K2U extends Service {
  protected logger: Logger
  static readonly methods = ['setInterval', 'setTimeout']
  static symbol = Symbol('k2u')
  submodules: Module[] = []

  get registry(): Registry {
    return this.provider.registry
  }

  static providers = class {
    static registryClass: new (root: Context, config: Registry.Config) => Registry = Registry
    static pluggerImpl: <C extends Context>(plugin: Plugin<C>) => ForkScope<C>

    static registry: InstanceType<typeof this.registryClass>
    static plugger: <C extends Context>(plugin: Plugin<C>) => ForkScope<C>

    static init(ctx: Context) {
      this.registry = this.getRegistry(ctx, {})
      this.plugger = this.getPlugger()
      return this
    }

    static update(name: string, clsOrInst: object | (new (...args: any[]) => any)) {
      throw Error("Not Implement")
    }

    static getRegistry(root: Context, config: Registry.Config = {}) {
      return new this.registryClass(root, config)
    }

    static getPlugger() {
      return this.plugger.bind(this) ?? this.registry.plugin.bind(this.registry)
    }
  }

  protected provider: typeof K2U.providers


  constructor(protected ctx: Context) {
    super(ctx, 'k2u')
    this.provider = K2U.providers.init(ctx)
    this.logger = ctx.logger(`k2u`)
  }

  plugin(module: new <C extends Context, T extends Get<C, 'config'>>(ctx: C, config?: T) => Module) {
    // check if it's a valid cordis plugin
    this.registry.resolve(module)


    this.submodules.push()
    this.registry.plugin(module.constructor)
    this.ctx.collect(module.name, () => {
      this.registry.delete(module.constructor)
    })
    return module
  }

  start() {
    this.logger.info("Let it unfold")
  }
}

export default K2U

Context.service('k2u', K2U)
