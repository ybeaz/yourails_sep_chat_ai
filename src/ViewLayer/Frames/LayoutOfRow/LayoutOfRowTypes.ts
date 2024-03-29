import { ReactElement } from 'react'

export type LayoutOfRowPropsType = {
  styleProps?: { LayoutOfRow: any; leftColumn: any; mainColumn: any }
  isLeftColumn?: boolean
  isMainColumn?: boolean
  children?: (ReactElement | null)[]
}

export type LayoutOfRowPropsOutType = any

/**
 * @import import { LayoutOfRowType } from './LayoutOfRowType'
 */
export interface LayoutOfRowType
  extends React.FunctionComponent<LayoutOfRowPropsType> {
  (props: LayoutOfRowPropsType): React.ReactElement
}
