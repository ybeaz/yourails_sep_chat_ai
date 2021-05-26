import { getSavedAnanlyticsInitData } from '../../Analytics/getSavedAnanlyticsInitData'
import { getAzProps } from '../../Analytics/getAzProps'
import { getResultDataFromStore } from './getResultDataFromStore'
import { getSavedAnanlyticsEvent } from '../../Analytics/getSavedAnanlyticsEvent'
import { getCopiedUrlToClipboard } from '../../Shared/getCopiedUrlToClipboard'
import { store } from '../../DataLayer/store'
import * as action from '../../DataLayer/index.action'
import { getPrintScreenAsPdf } from '../../Shared/getPrintScreenAsPdf'
import { getPrintedDocumentAs } from '../../Shared/getPrintedDocumentAs'
import { getSetObjToLocalStorage } from '../../Shared/getSetObjToLocalStorage'

interface Props {
  typeEvent: string
  type?: string
  data: any
}

export const handleEvents: Function = (event: any, props: Props): void => {
  const { type: typeStore, typeEvent, data } = props
  const type = typeStore ? typeStore : typeEvent
  const { dispatch, getState } = store

  const output = {
    CLICK_LOGO_GROUP: () => {
      const azProps = {
        type: 'click',
        name: 'logo clicked',
      }
      getSavedAnanlyticsEvent(event, azProps)
    },

    SAVE_ANALYTICS_INIT_DATA: () => {
      getSavedAnanlyticsInitData()
    },

    TOGGLE_MEDIA_LOADED: () => {
      const { mediaKey, isMediaLoaded } = data
      dispatch(action.TOGGLE_MEDIA_LOADED({ mediaKey, isMediaLoaded }))
    },

    TOGGLE_START_COURSE: () => {
      const { isStarting, courseCapture } = data
      event?.preventDefault &&
        isStarting &&
        getSavedAnanlyticsEvent(
          event,
          getAzProps('MODULE_STARTED')({ courseCapture })
        )

      dispatch(action.TOGGLE_START_COURSE(isStarting))
    },

    ONCHANGE_SEARCH_INPUT: () => {
      const { value } = event.target as HTMLInputElement
      dispatch(action.ONCHANGE_SEARCH_INPUT(value))
    },

    SELECT_LANGUAGE: () => {
      getSavedAnanlyticsEvent(event, getAzProps('LANGUAGE_SELECTED')(data))

      dispatch(action.SELECT_LANGUAGE(data))
      getSetObjToLocalStorage({ language: data })
    },

    SEND_EMAIL_DOCUMENT: () => {
      dispatch(action.SEND_EMAIL_DOCUMENT.REQUEST(data))
    },

    ONCHANGE_EMAIL_CC: () => {
      const { value } = event.target as HTMLInputElement
      dispatch(action.ONCHANGE_EMAIL_CC(value))
    },

    ONCHANGE_EMAIL_TO: () => {
      const { value } = event.target as HTMLInputElement
      dispatch(action.ONCHANGE_EMAIL_TO(value))
    },

    TOGGLE_MODAL_FRAME: () => {
      dispatch(action.TOGGLE_MODAL_FRAME(data))
    },

    COPY_URL_TO_CLIPBOARD: () => {
      getCopiedUrlToClipboard()
    },

    TOGGLE_IS_DOCUMENT_ADDED: () => {
      dispatch(action.TOGGLE_IS_DOCUMENT_ADDED(false))
    },

    PRINT_DOCUMENT: () => {
      getPrintedDocumentAs()
    },

    FIND_DOCUMENT: () => {
      dispatch(action.FIND_DOCUMENT.REQUEST(data))
    },

    ADD_DOCUMENT: () => {
      const { courses } = getState()
      const options = getResultDataFromStore(courses)
      event?.preventDefault &&
        getSavedAnanlyticsEvent(
          event,
          getAzProps('PERSONAL_DATA_SUBMITTED')(options)
        )

      dispatch(action.ADD_DOCUMENT.REQUEST(data))
    },

    SET_QUESTION_SLIDE: () => {
      dispatch(action.SET_QUESTION_SLIDE(data))
    },

    PLUS_QUESTION_SLIDE: () => {
      const { step } = data
      const { courses } = getState()
      const options = getResultDataFromStore(courses)
      event?.preventDefault &&
        step === 1 &&
        getSavedAnanlyticsEvent(
          event,
          getAzProps('QUESTIONS_STEPPED_FORWARD')(options)
        )

      dispatch(action.PLUS_QUESTION_SLIDE(data))
    },

    ONCHANGE_FIRST_NAME_MODAL: () => {
      const { value } = event.target as HTMLInputElement
      dispatch(action.ONCHANGE_FIRST_NAME_MODAL(value))
    },

    ONCHANGE_MIDDLE_NAME_MODAL: () => {
      const { value } = event.target as HTMLInputElement
      dispatch(action.ONCHANGE_MIDDLE_NAME_MODAL(value))
    },

    ONCHANGE_LAST_NAME_MODAL: () => {
      const { value } = event.target as HTMLInputElement
      dispatch(action.ONCHANGE_LAST_NAME_MODAL(value))
    },

    CLOSE_MODAL_GET_SCORES: () => {
      const { courses } = getState()
      const options = getResultDataFromStore(courses)
      event?.preventDefault &&
        getSavedAnanlyticsEvent(event, getAzProps('WENT_BACK')(options))

      dispatch(action.GET_ANSWERS_DEFAULT())
      dispatch(action.SET_QUESTION_SLIDE(0))
      dispatch(action.TOGGLE_MODAL_FRAME(false))
    },

    OPEN_MODAL_GET_SCORES: () => {
      const { courses } = getState()
      const options = getResultDataFromStore(courses)
      event?.preventDefault &&
        getSavedAnanlyticsEvent(event, getAzProps('RESULTS_SUBMITTED')(options))

      dispatch(action.TOGGLE_MODAL_FRAME(true))
    },

    PRINT_SCORES: () => {
      dispatch(action.TOGGLE_MODAL_FRAME(false))

      const {
        screenType,
        userName,
        userEmail,
        capture,
        courseID,
        moduleID,
        contentID,
        meta,
        description,
      } = data

      getPrintScreenAsPdf({
        screenType,
        userName,
        meta,
        capture,
        description,
        contentID,
      })

      dispatch(action.GET_ANSWERS_DEFAULT())
    },

    COUNT_MODULE_QUIZ_SCORE: () => {
      dispatch(action.TOGGLE_MODAL_FRAME(true))
    },

    SELECT_COURSE_MODULE_CONTENTID: () => {
      dispatch(action.SELECT_COURSE_MODULE_CONTENTID(data))
    },

    SELECT_COURSE_MODULE: () => {
      getSavedAnanlyticsEvent(event, getAzProps('COURSE_PLATE_CLICKED')(data))

      dispatch(action.SELECT_COURSE_MODULE(data))
    },

    CLICK_CHECK: () => {
      dispatch(action.CLICK_CHECK(data))
    },

    TOGGLE_SIDE_NAVIGATION: () => {
      dispatch(action.TOGGLE_SIDE_NAVIGATION())

      getSavedAnanlyticsEvent(event, getAzProps('SIDE_PANEL_TOGGLED')())
    },
  }

  output[type]
    ? output[type]()
    : console.info('handleEvents [error]', 'strange type', {
        typeStore,
        typeEvent,
        type,
        data,
      })
}
