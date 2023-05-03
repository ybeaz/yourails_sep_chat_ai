import React from 'react'
import { View } from 'react-native'

import { ImageYrl } from '../../../YrlNativeViewLibrary'
import { getFilteredObjsArrayByIdUser } from '../../../Shared/getFilteredObjsArrayByIdUser'
import { LinkType } from '../../../@types/LinkType'
import { withStoreStateYrl } from '../../../YrlNativeViewLibrary'
import {
  withParamsMediaYrl,
  mediaParamsDefault,
  DeviceType,
} from '../../../YrlNativeViewLibrary'
import { ProfileItem } from '../ProfileItem/ProfileItem'
import { ProfileItemPropsType } from '../ProfileItem/ProfileItemType'
import { styles } from './ProfileStyle'
import { ProfileComponentType } from './ProfileComponentType'
import { ProfileType } from '../../../@types/ProfileType'
import { getMessengesString } from '../../../Shared/getMessengesString'

import { links } from '../../../ContentMock/linksMock'
import { profiles } from '../../../ContentMock/profilesMock'

// TODO Refactor wile moving to multiprofile and multiprofiler service
const getProfileItemsObjList = (
  profileIn: ProfileType,
  links: LinkType[],
  style: any,
  deviceType: DeviceType
): ProfileItemPropsType[] => {
  const {
    profileName = '',
    phones = [],
    emails = [],
    messengers = [],
    locations = [],
    summary,
    serviceSpecs = [],
  } = profileIn

  return [
    {
      iconLibrary: 'Ionicons',
      iconName: 'checkmark-outline',
      contentType: 'string',
      content: serviceSpecs.join(', '),
      label: 'Service specs',
      isActive:
        deviceType === DeviceType['xsDevice'] ||
        deviceType === DeviceType['smDevice']
          ? true
          : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'albums-outline',
      contentType: 'string',
      content: summary,
      label: 'Summary',
      isActive: true,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'at',
      content: profileName.toString(),
      label: 'Username',
      isActive: true,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'location-outline',
      content: locations.join(', '),
      label: 'Locations',
      isActive: true,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'chatbox-ellipses-outline',
      content: getMessengesString(messengers, style),
      label: 'Messengers',
      isActive: true,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'call-outline',
      content: phones.join(', '),
      label: 'Phons',
      isActive: true,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'mail-outline',
      content: emails.join(', '),
      label: 'Email',
      isActive: true,
    },
    ...links,
  ]
}

/**
 * @import import { Profile } from '../Components/Profile/Profile'
 */
const ProfileComponent: ProfileComponentType = props => {
  const {
    styleProps = { Profile: {} },
    mediaParams = mediaParamsDefault,
    store,
  } = props
  const { deviceType } = mediaParams
  const style = styles[deviceType]

  // const store = useSelector((store2: RootStoreType) => store2)
  const {
    globalVars: { idUserHost },
  } = store

  const profilesTagsUserHost = getFilteredObjsArrayByIdUser(
    profiles,
    idUserHost
  ) as ProfileType[]
  const profileTagsUserHost = profilesTagsUserHost[0]

  const linksUserHost = getFilteredObjsArrayByIdUser(
    links,
    idUserHost
  ) as LinkType[]

  const profileItems = getProfileItemsObjList(
    profileTagsUserHost,
    linksUserHost,
    style,
    deviceType
  ).filter(profileItemObj => profileItemObj.isActive === true)

  const getProfileItems = (profileItemsIn: ProfileItemPropsType[]) =>
    profileItemsIn.map(
      (profileItemProps: ProfileItemPropsType, index: number) => (
        <ProfileItem key={`profileItem-${index}`} {...profileItemProps} />
      )
    )

  const propsOut: Record<string, any> = {
    imageYrlProps: {
      styleProps: {
        ImageYrl: style.ImageYrl,
        image: style.image,
      },
      resizeMode: 'cover',
      testID: 'profile_imageYrl',
      uri: profileTagsUserHost.uriAvatar,
    },
  }

  return (
    <View style={[style.Profile, styleProps.Profile]} testID='Profile'>
      <View style={[style.imageWrapper]} testID='imageWrapper'>
        <ImageYrl {...propsOut.imageYrlProps} />
      </View>
      <View style={[style.profileItemsWrapper]} testID='profileItemsWrapper'>
        {getProfileItems(profileItems)}
      </View>
    </View>
  )
}

export const Profile = React.memo(
  withStoreStateYrl(withParamsMediaYrl(ProfileComponent))
)
