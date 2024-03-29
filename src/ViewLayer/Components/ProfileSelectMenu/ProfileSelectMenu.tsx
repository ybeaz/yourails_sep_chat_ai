import React, { ReactElement } from 'react'
import { View } from 'react-native'

import {
  withPropsYrl,
  withParamsMediaYrl,
  mediaParamsDefault,
} from '../../../YrlNativeViewLibrary'
import { NameStatus } from '../NameStatus/NameStatus'
import {
  ProfileSelectMenuType,
  ProfileSelectMenuPropsOutType,
} from './ProfileSelectMenuTypes'
import { ProfileType } from '../../../@types/GraphqlTypes'
import { AvatarPlusInfo } from '../AvatarPlusInfo/AvatarPlusInfo'
import { styles } from './ProfileSelectMenuStyles'
import { themes } from '../../Styles/themes'
import { handleEvents as handleEventsProp } from '../../../DataLayer/index.handleEvents'
import '../../Styles/styleGlobal'

/**
 * @import import { ProfileSelectMenu } from '../Components/ProfileSelectMenu/ProfileSelectMenu'
 * @propsOut
   profileSelectMenuProps: {
      styleProps: {
        ProfileSelectMenu: {
          ...themes['themeA'].colors01,
        },
      },
      profiles,
      userHostID,
   },
 */
const ProfileSelectMenuComponent: ProfileSelectMenuType = props => {
  const {
    styleProps = { ProfileSelectMenu: {} },
    mediaParams = mediaParamsDefault,
    handleEvents,
    profiles,
    userHostID,
    urlParam1,
    urlParam2,
    query,
    platformOS,
  } = props
  const { deviceType } = mediaParams
  const style = styles[deviceType]

  console.info('ProfileSelectMenu [49]', { platformOS })

  const profilesUserHost = profiles.filter(
    (profile: ProfileType) => profile.userID === userHostID
  )

  const getUserHostProfiles = (
    profilesUserHostIn: ProfileType[]
  ): ReactElement[] => {
    return profilesUserHostIn.map((profile: ProfileType, index: number) => {
      const { profileID, profileName } = profile
      const propsOut = {
        avatarPlusInfoProps: {
          key: `userHostAvatarPlusInfo-${index}`,
          styleProps: {
            AvatarPlusInfo: { paddingBottom: '0.5rem'.getPx() },
          },
          profile,
          onPress: () =>
            handleEvents.CLICK_ON_HOST_PROFILE_SELECT(
              {},
              {
                profileHostID: profileID,
                profileNameHost: profileName,
                urlParam1,
                urlParam2,
                query,
                platformOS,
              }
            ),
          testID: 'userHostAvatarPlusInfo',
        },
        nameStatusProps: {
          styleProps: {
            NameStatus: {},
            viewStyle: themes['themeA'].colors01,
          },
          profile,
          status: '',
        },
      }

      return (
        <AvatarPlusInfo {...propsOut.avatarPlusInfoProps}>
          <NameStatus {...propsOut.nameStatusProps} />
        </AvatarPlusInfo>
      )
    })
  }

  const propsOut: ProfileSelectMenuPropsOutType = {}

  return (
    <View
      style={[style.ProfileSelectMenu, styleProps.ProfileSelectMenu]}
      testID='ProfileSelectMenu'
    >
      {getUserHostProfiles(profilesUserHost)}
    </View>
  )
}

export const ProfileSelectMenu = withPropsYrl({
  handleEvents: handleEventsProp,
})(withParamsMediaYrl(React.memo(ProfileSelectMenuComponent)))
