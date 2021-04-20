import { push, goBack } from 'react-router-redux'

import { store } from '../../DataLayer/store'
import * as action from '../../DataLayer/index.action'
import { getPrintScreenAsPdf } from '../../Shared/getPrintScreenAsPdf'
import { getPrintedDocumentAs } from '../../Shared/getPrintedDocumentAs'

interface Props {
  typeEvent: string
  type?: string
  data: any
}

export const handleEvents: Function = (event: Event, props: Props): void => {
  const { type: typeStore, typeEvent, data } = props
  const type = typeStore ? typeStore : typeEvent
  const { dispatch } = store

  const output = {
    BACK_FROM_DOC_TO_COURSE: () => {
      console.info('handleEvents [19]', 'We are here')
      dispatch(goBack())
    },

    REDIRECT_TO_URL: () => {
      console.info('handleEvents [26]', { data })
      dispatch(push(data))
    },

    PRINT_DOCUMENT: () => {
      getPrintedDocumentAs()
    },

    FIND_DOCUMENT: () => {
      dispatch(action.FIND_DOCUMENT.REQUEST(data))
    },

    ADD_DOCUMENT: () => {
      dispatch(action.ADD_DOCUMENT.REQUEST(data))
    },

    SET_QUESTION_SLIDE: () => {
      dispatch(action.SET_QUESTION_SLIDE(data))
    },

    PLUS_QUESTION_SLIDE: () => {
      dispatch(action.PLUS_QUESTION_SLIDE(data))
    },

    ONCHANGE_EMAIL_MODAL: () => {
      const { value } = event.target as HTMLTextAreaElement
      dispatch(action.ONCHANGE_EMAIL_MODAL(value))
    },

    ONCHANGE_NAME_MODAL: () => {
      const { value } = event.target as HTMLTextAreaElement
      dispatch(action.ONCHANGE_NAME_MODAL(value))
    },

    CLOSE_MODAL_GET_SCORES: () => {
      dispatch(action.GET_ANSWERS_DEFAULT())
      dispatch(action.SET_QUESTION_SLIDE(0))
      dispatch(action.TOGGLE_MODAL_GET_SCORES(false))
    },

    OPEN_MODAL_GET_SCORES: () => {
      dispatch(action.TOGGLE_MODAL_GET_SCORES(true))
    },

    PRINT_SCORES: () => {
      dispatch(action.TOGGLE_MODAL_GET_SCORES(false))

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
      dispatch(action.TOGGLE_MODAL_GET_SCORES(true))
    },

    SELECT_COURSE_MODULE_CONTENTID: () => {
      dispatch(action.SELECT_COURSE_MODULE_CONTENTID(data))
    },

    SELECT_COURSE_MODULE: () => {
      dispatch(action.SELECT_COURSE_MODULE(data))
    },

    CLICK_CHECK: () => {
      dispatch(action.CLICK_CHECK(data))
    },

    TOGGLE_SIDE_NAVIGATION: () => {
      dispatch(action.TOGGLE_SIDE_NAVIGATION())
    },
  }

  output[type]
    ? output[type]()
    : console.info('handleEvents [error]', 'strange type', {
        typeStore,
        typeEvent,
        type,
      })
}
