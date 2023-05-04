import { MediaParamsDefaultType } from '../../../YrlNativeViewLibrary'
import { ProfileType } from '../../../@types/ProfileType'

export interface TopBarMainColumnPropsType {
  profile: ProfileType
  mediaParams?: MediaParamsDefaultType
  isButtonBack: boolean
  isImageAvatar: boolean
}

/**
 * @import import { TopBarMainColumnType } from './TopBarMainColumnType'
 */
export interface TopBarMainColumnType
  extends React.FunctionComponent<TopBarMainColumnPropsType> {
  (props: TopBarMainColumnPropsType): React.ReactElement
}
