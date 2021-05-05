import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { PlayerPanel } from '../Components/PlayerPanel'
import { LoaderBlurhash } from '../Components/LoaderBlurhash'
import { getContentComponentName } from '../../Shared/getContentComponentName'
import { getMultipliedTimeStr } from '../../Shared/getMultipliedTimeStr'
import { getModuleByCourseIDIndex } from '../../Shared/getModuleByCourseIDIndex'
import { getYouTubePlayerWorkHook } from '../Hooks/getYouTubePlayerWorkHook'
import { VIDEO_RESOLUTION } from '../../Constants/videoResolution.const'
import { handleEvents } from '../Hooks/handleEvents'
import { QuestionScores } from '../Components/QuestionScores'
import { ModalFrame } from '../Frames/ModalFrame'
import { IRootStore } from '../../Interfaces/IRootStore'
import { IRouterScreenProps } from '../../Interfaces/IRouterScreenProps'
import { IDurationObj } from '../../Interfaces/IDurationObj'
import { LoaderOverlay } from '../Components/LoaderOverlay'
import { MainFrame } from '../Frames/MainFrame'
import { ReaderIframe } from '../Frames/ReaderIframe'
import { PlayerIframe } from '../Frames/PlayerIframe'
import { CarouselQuestions } from '../Components/CarouselQuestions'

const COMPONENT = {
  ReaderIframe,
  PlayerIframe,
}

export const PresentAndSubscribe: React.FunctionComponent<any> = (
  props: IRouterScreenProps = { routeProps: {}, rootPath: '' }
) => {
  const courseID = props?.routeProps.match.params.courseID

  const store = useSelector((store: IRootStore) => store)
  const {
    globalVars: { durationMultiplier },
    courses,
    componentsState: { isModalFrameVisible },
    isLoaded: { mediaLoading },
  } = store

  const [isLoaded, setIsLoaded] = useState(false)
  const [moduleState, setModuleState] = useState({
    CONTENT_ASSIGNED_COMPONENT: null,
    contentComponentName: '',
    courseCapture: '',
    moduleCapture: '',
    contentID: '',
    durationObj: {},
    moduleIndex: 0,
    modulesTotal: 0,
    questionsTotal: 0,
  })

  useEffect(() => {
    if (courses.length && isLoaded === false) {
      handleEvents({}, { type: 'TOGGLE_START_COURSE', data: false })

      const index = 0

      handleEvents(
        {},
        { type: 'SELECT_COURSE_MODULE_CONTENTID', data: { courseID, index } }
      )
      setIsLoaded(true)

      const {
        courseCapture,
        capture: moduleCapture,
        contentType,
        contentID,
        duration,
        index: moduleIndex,
        modulesTotal,
        questionsTotal,
      } = getModuleByCourseIDIndex({ courses, courseID, index })

      const durationObj: IDurationObj = getMultipliedTimeStr(
        duration,
        durationMultiplier
      )

      const contentComponentName = getContentComponentName(contentType)

      setModuleState({
        CONTENT_ASSIGNED_COMPONENT: COMPONENT[contentComponentName],
        contentComponentName,
        courseCapture,
        moduleCapture,
        contentID,
        moduleIndex,
        modulesTotal,
        questionsTotal,
        durationObj,
      })
    }
  }, [mediaLoading, courses])

  const {
    CONTENT_ASSIGNED_COMPONENT,
    contentComponentName,
    courseCapture,
    moduleCapture,
    contentID,
    durationObj,
    moduleIndex,
    modulesTotal,
    questionsTotal,
  } = moduleState

  const isVisible = mediaLoading[contentID]

  const { width, height } = VIDEO_RESOLUTION
  const {
    onPlayerReady,
    playVideoHandler,
    pauseVideoHandler,
    stopVideoHandler,
    isShowingPlay,
  } = getYouTubePlayerWorkHook({
    contentComponentName,
    contentID,
    width,
    height,
  })

  const contentComponentProps = {
    ReaderIframe: {
      contentID,
      isVisible,
    },
    PlayerIframe: {
      contentID,
      isVisible,
    },
  }

  const buttonPlayProps = {
    icon: 'MdPlayArrow',
    classAdded: 'Button_MdPlayArrow',
    handleEvents: playVideoHandler,
    action: {},
  }
  const buttonPauseProps = {
    icon: 'MdPause',
    classAdded: 'Button_MdPause',
    handleEvents: pauseVideoHandler,
    action: {},
  }
  const buttonStopProps = {
    icon: 'MdRemoveCircle',
    classAdded: 'Button_MdRemoveCircle',
    handleEvents: stopVideoHandler,
    action: {},
  }

  const playerPanelProps = {
    courseCapture,
    moduleCapture,
    durationObj,
    screenType: 'PresentAndSubscribe',
    isShowingPlay,
    buttonPlayProps,
    buttonPauseProps,
    buttonStopProps,
    isActionButtonDisplaying: false,
    moduleIndex,
    modulesTotal,
    questionsTotal,
  }

  const carouselQuestionsProps = { durationObj }

  const questionScoresProps = { stopVideoHandler, routeProps: props.routeProps }

  return (
    <div className='PresentAndSubscribe'>
      {isLoaded === true ? (
        <>
          <MainFrame>
            {null}
            <CONTENT_ASSIGNED_COMPONENT
              {...contentComponentProps[contentComponentName]}
            >
              <LoaderBlurhash isVisible={isVisible} />
              <PlayerPanel {...playerPanelProps} />
            </CONTENT_ASSIGNED_COMPONENT>
            <CarouselQuestions {...carouselQuestionsProps} />
          </MainFrame>

          <ModalFrame>
            <QuestionScores {...questionScoresProps} />
          </ModalFrame>

          <LoaderOverlay />
        </>
      ) : null}
    </div>
  )
}
