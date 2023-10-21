import { Context } from 'koishi'
import { DataService } from '@koishijs/console'

declare module '@koishijs/console' {
  namespace Console {
    interface Services {
      ustore: UStore
    }
  }
}

class UStore extends DataService {
  constructor(protected ctx: Context) {
    super(ctx, 'ustore', { authority: 114514 });
  }
}
