import { Context, Logger, Service } from 'koishi'

declare module 'koishi' {
    interface Context {
        setInterval<T extends () => any>(func: T, ms: number, ...args: Parameters<T>): () => void

        setTimeout<T extends () => any>(func: T, ms: number, ...args: Parameters<T>): () => void
    }
}

class K2U extends Service {
    protected logger: Logger
    static readonly methods = ['setInterval', 'setTimeout']

    constructor(protected ctx: Context, pName: string) {
        super(ctx, 'k2u.${pName}', false)
        this.logger = ctx.logger(`k2u.${pName}`)
    }

    plugin() {

    }

    start() {
        this.logger.info("Let it unfold")
    }
}

export default K2U

Context.service('k2u.utils', K2U)
