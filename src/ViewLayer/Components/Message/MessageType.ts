import { IdUserType } from '../../../@types/UserType'

export interface MessagePropsType {
  idMessage: string | number
  idProfile: IdUserType
  text: string
  createdAt: Date | number | string
  position?: string
  isTail?: boolean
  image?: string
  video?: string
  audio?: string
  isSystem?: boolean
  isSent?: boolean
  isReceived?: boolean
  isPending?: boolean
}

/**
 * @import import { MessageType } from './MessageType'
 */
export interface MessageType extends React.FunctionComponent<MessagePropsType> {
  (props: MessagePropsType): React.ReactElement
}
