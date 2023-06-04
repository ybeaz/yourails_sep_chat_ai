import { IdUserType } from '../@types/UserType'
import { MessageEventType } from '../@types/MessageEventType'

/**
 * @import import { MessageType } from '../@types/MessageType'
 */
export type MessageType = {
  createdAt?: number
  idConversation: string
  idMessage?: string
  idProfile: IdUserType
  isPending?: boolean
  pendingImage?: string
  isTail?: boolean
  position?: string
  eventType: MessageEventType
  text: string
}
