import React, { ReactElement, useEffect, useRef } from 'react'
import { View } from 'react-native'

import { handleEvents as handleEventsProp } from '../../../DataLayer/index.handleEvents'
import { getFilteredObjsArrayBy } from '../../../Shared/getFilteredObjsArrayBy'
import { withPropsYrl, withStoreStateYrl } from '../../../YrlNativeViewLibrary'
import { CompetencyTagType } from '../../../@types/GraphqlTypes'
import { SectionMappingType } from '../../../@types/SectionMappingType'
import { getSectionsFromTagsCompetencies } from '../../../Shared/getSectionsFromTagsCompetencies'
import { Header } from '../Header/Header'
import { Text } from '../../Components/Text/Text'
import { TagProperty, TagPropertyPropsType } from '../TagProperty/TagProperty'
import { CompetencyTagsType } from './CompetencyTagsType'
import { style } from './CompetencyTagsStyle'
import '../../Styles/styleGlobal'

/**
 * @import import { CompetencyTags } from '../Components/CompetencyTags/CompetencyTags'
 */
const CompetencyTagsComponent: CompetencyTagsType = props => {
  const { styleProps = { CompetencyTags: {} }, store, handleEvents } = props

  // const store = useSelector((store2: RootStoreType) => store2)
  const {
    globalVars: { profileActiveID },
    componentsState: {
      modalFrame: { childName },
    },
    competencyTags,
    sectionsMapping,
  } = store

  useEffect(() => {
    handleEvents.ADD_COMPETENCY_TAGS({}, { profileID: profileActiveID })
  }, [profileActiveID])

  const sectionMapping =
    sectionsMapping.find(
      (item: SectionMappingType) =>
        item.profileID === profileActiveID && item.childName === childName
    ) || sectionsMapping[0]

  const { title } = sectionMapping

  // TODO Remove in the future
  const idProfileActive2 = profileActiveID === '16' ? '1' : profileActiveID

  const competencyTagsUserActive = getFilteredObjsArrayBy(
    competencyTags,
    'profileID',
    idProfileActive2
  ) as CompetencyTagType[]

  const getTagList = (competencies: CompetencyTagType[]): ReactElement[] => {
    return competencies.map((competency, index: number) => {
      const { title, linkHref, tooltips, iconLibrary, iconName } = competency

      const tagPropertyProps: TagPropertyPropsType = {
        key: `tagProperty-${index}`,
        title,
        linkHref,
        tooltips,
        iconLibrary,
        iconName,
        testID: 'CompetencyTags_item',
      }
      return <TagProperty {...tagPropertyProps} />
    })
  }

  const getCompetencyTagsJsx = (competencyTagsIn: CompetencyTagType[]) => {
    const sections = getSectionsFromTagsCompetencies(competencyTagsIn)

    return sections.map((section: string, index: number) => {
      const competencyTagsFiltered = competencyTagsIn.filter(
        (competencyTag: CompetencyTagType) => competencyTag.section === section
      )

      return (
        <View
          key={`competencyTags-${index}`}
          style={[style.tagListWrapper]}
          testID='tagListWrapper'
        >
          <Text style={[style.tagSubheading]} testID='tagSubheading'>
            {`${section}: `}
          </Text>
          {getTagList(competencyTagsFiltered)}
        </View>
      )
    })
  }

  const propsOut: Record<string, any> = {
    tagPropertyProps: {},
    headerProps: {
      styleProps: {
        Header: { paddingBottom: '1rem'.getPx() },
        headerText: {},
      },
      mediaParams: { deviceType: '' },
      headerText: title,
    },
  }

  return (
    <View
      style={[style.CompetencyTags, styleProps.CompetencyTags]}
      testID='CompetencyTags'
    >
      <Header {...propsOut.headerProps} />
      {getCompetencyTagsJsx(competencyTagsUserActive)}
    </View>
  )
}

export const CompetencyTags = withPropsYrl({ handleEvents: handleEventsProp })(
  withStoreStateYrl(React.memo(CompetencyTagsComponent))
)
