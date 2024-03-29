import React from 'react'
import { View } from 'react-native'

import { ImageYrl } from '../../../YrlNativeViewLibrary'
import { getFilteredObjsArrayBy } from '../../../Shared/getFilteredObjsArrayBy'
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
import { ProfileType } from '../../../@types/GraphqlTypes'
import { MessengesElement } from './MessengesElement'
import { PromptsExamplesElement } from './PromptsExamplesElement'

import { links } from '../../../ContentMock/linksMock'

// TODO Refactor while moving to multiprofile service
const getProfileItemsObjList = (
  profileIn: ProfileType,
  linksIn: LinkType[],
  style: any,
  deviceType: DeviceType
): ProfileItemPropsType[] => {
  const {
    profileName = '',
    phones = [],
    emails = [],
    messengers = [],
    locations = [],
    description,
    disclaimer,
    serviceSpecs = [],
    promptExamples = [],
  } = profileIn

  return [
    {
      iconLibrary: 'Ionicons',
      iconName: 'checkmark-outline',
      contentType: 'string',
      content: serviceSpecs?.join(', '),
      label: 'Service specs',
      isActive:
        serviceSpecs?.length &&
        (deviceType === DeviceType['xsDevice'] ||
          deviceType === DeviceType['smDevice'])
          ? true
          : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'albums-outline',
      contentType: 'string',
      content: description,
      label: 'Summary',
      isActive: description ? true : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'pencil-outline',
      content: <PromptsExamplesElement promptExamples={promptExamples || []} />,
      label: 'Prompt Examples',
      isActive: promptExamples?.length ? true : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'alert-circle-outline',
      contentType: 'string',
      content: disclaimer,
      label: 'Disclaimer',
      isActive: disclaimer ? true : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'at',
      content: profileName.toString(),
      label: 'Username',
      isActive: profileName ? true : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'location-outline',
      content: locations?.join(', '),
      label: 'Locations',
      isActive: locations?.length ? true : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'chatbox-ellipses-outline',
      content: <MessengesElement messengers={messengers || []} style={style} />,
      label: 'Messengers',
      isActive: messengers?.length ? true : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'call-outline',
      content: phones?.join(', '),
      label: 'Phones',
      isActive: phones?.length ? true : false,
    },
    {
      iconLibrary: 'Ionicons',
      iconName: 'mail-outline',
      content: emails?.join(', '),
      label: 'Email',
      isActive: emails?.length ? true : false,
    },
    ...linksIn,
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

  const {
    profiles,
    globalVars: { profileActiveID },
  } = store

  const profilesTagsUserHost = getFilteredObjsArrayBy(
    profiles,
    'profileID',
    profileActiveID
  ) as ProfileType[]
  const profileTagsUserHost = profilesTagsUserHost[0]

  const linksUserHost = getFilteredObjsArrayBy(
    links,
    'profileID',
    profileActiveID
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
      uri: profileTagsUserHost.avatarSrc,
    },
  }

  return (
    <View style={[style.Profile, styleProps.Profile]} testID='Profile'>
      {profileTagsUserHost.avatarSrc ? (
        <View style={[style.imageWrapper]} testID='imageWrapper'>
          <ImageYrl {...propsOut.imageYrlProps} />
        </View>
      ) : null}
      <View style={[style.profileItemsWrapper]} testID='profileItemsWrapper'>
        {getProfileItems(profileItems)}
      </View>
    </View>
  )
}

export const Profile = React.memo(
  withStoreStateYrl(withParamsMediaYrl(ProfileComponent))
)
