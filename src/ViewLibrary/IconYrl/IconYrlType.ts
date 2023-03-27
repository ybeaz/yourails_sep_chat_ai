/**
 * @import import { IconYrlPropsType } from './ViewLibrary/IconYrl/IconYrlPropsType'
 */
export interface IconYrlPropsType {
  library?: string
  name?: string
  color?: string
  size?: number | string
  styleProps?: any
  testID?: string
}

export interface IconYrlType extends React.FunctionComponent<IconYrlPropsType> {
  (props: IconYrlPropsType): React.ReactElement
}
