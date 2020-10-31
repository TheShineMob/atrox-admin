import { cliUtils } from '@/cli/utils'
import { Commit } from 'vuex'

export default {
  namespaced: true,
  actions: {
    set(
      context: { commit: Commit },
      payload: {
        database: string
        path: string
        value: string | Record<string, any>
      }
    ) {
      cliUtils.db.set(payload.database, payload.path, payload.value)
    },
    get(
      context: { commit: Commit },
      payload: {
        database: string
        path: string
        defaultValue: string | Record<string, any>
      }
    ) {
      return cliUtils.db.get(payload.database, payload.path, payload.defaultValue)
    }
  }
}
