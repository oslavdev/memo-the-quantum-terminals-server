import { shield, rule } from 'graphql-shield'
import {Context} from '../context'

/**
 * @TODO add isAdmin rule
 */

export const rules = {
  isAuthenticatedUser: rule({ cache: 'contextual' })(
    (_parent, _args, ctx: Context): any => {
      try { 
        if (!ctx.userId) {
         return Error('Unauthenticated user!')
        }
        return true
      } catch (e) {
        return e
      }
    }
  ),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser
  },
})
