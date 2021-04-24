import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Header } from '../Components/Header'
import { IRouterScreenProps } from '../../Interfaces/IRouterScreenProps'
import { ShareButtons } from '../Components/ShareButtons'
import { Button } from '../Components/Button'
import { IRootStore } from '../../Interfaces/IRootStore'
import { handleEvents } from '../Hooks/handleEvents'
import { LoaderOverlay } from '../Components/LoaderOverlay'
import { getDateString } from '../../Shared/getDateString'

export const Certificate: React.FunctionComponent<any> = (
  props: IRouterScreenProps
): JSX.Element => {
  const {
    routeProps: {
      match: {
        params: { documentID },
      },
    },
  } = props

  let history = useHistory()
  const dispatch = useDispatch()
  const store = useSelector((store: IRootStore) => store)
  const { documents } = store

  useEffect(() => {
    handleEvents({}, { typeEvent: 'CLOSE_MODAL_GET_SCORES' })
  }, [])

  useEffect(() => {
    if (!documents.length) {
      handleEvents({}, { typeEvent: 'FIND_DOCUMENT', data: documentID })
    }
  }, [documents])

  let documentDefault = {
    userName: '',
    meta: { institution: '', specTitle: '', specName: '' },
    capture: '',
    contentID: '',
  }
  const {
    userName = '',
    meta: { institution = '', specTitle = '', specName = '' },
    capture = '',
    contentID = '',
  } = documents[0] || documentDefault

  const dateString = getDateString({})

  const getPageGoBack: Function = (): void => {
    history.go(-1)
  }

  const buttonBackProps = {
    icon: 'MdForward',
    classAdded: 'Button_MdBackward3',
    handleEvents: getPageGoBack,
  }

  const buttonPrintProps = {
    icon: 'MdPrint',
    classAdded: 'Button_MdPrint',
    handleEvents,
    action: { typeEvent: 'PRINT_DOCUMENT', data: {} },
  }

  const buttonEmailProps = {
    icon: 'MdMailOutline',
    classAdded: 'Button_MdPrint',
    handleEvents,
    action: { typeEvent: 'PRINT_DOCUMENT', data: {} },
  }

  const buttonCopyLinkProps = {
    icon: 'BsLink45Deg',
    classAdded: 'Button_MdPrint',
    handleEvents,
    action: { typeEvent: 'COPY_URL_TO_CLIPBOARD', data: {} },
  }

  return (
    <div className='Certificate'>
      <div className='_buttons Certificate_noPrint'>
        <Header>
          <Button {...buttonBackProps} />
          <div className='__navigation'>
            <div className='_buttons'>
              <Button {...buttonPrintProps} />
              <Button {...buttonEmailProps} />
              <Button {...buttonCopyLinkProps} />
              <ShareButtons />
            </div>
          </div>
        </Header>
      </div>

      <div className='container pm-certificate-container'>
        <div className='outer-border'></div>
        <div className='inner-border'></div>

        <div className='pm-certificate-border col-xs-12'>
          <div className='row pm-certificate-header'>
            <div className='pm-certificate-title cursive col-xs-12 text-center'>
              <h4>{institution}</h4>
              <h2>Certificate of Completion</h2>
            </div>
          </div>

          <div className='row pm-certificate-body'>
            <div className='pm-certificate-block'>
              <div className='col-xs-12'>
                <div className='row'>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                  <div className='pm-certificate-name underline margin-0 col-xs-8 text-center'>
                    <span className='pm-name-text bold'>{userName}</span>
                  </div>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                </div>
              </div>

              <div className='col-xs-12'>
                <div className='row'>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                  <div className='pm-earned col-xs-8 text-center'>
                    <span className='pm-earned-text padding-0 block cursive'>
                      has earned
                    </span>
                    <span className='pm-credits-text block bold sans'>
                      1.0 Credit Hours
                    </span>
                  </div>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                  <div className='col-xs-12'></div>
                </div>
              </div>

              <div className='col-xs-12'>
                <div className='row'>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                  <div className='pm-course-title col-xs-8 text-center'>
                    <span className='pm-earned-text block cursive'>
                      while completing the training course entitled
                    </span>
                  </div>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                </div>
              </div>

              <div className='col-xs-12'>
                <div className='row'>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                  <div className='pm-course-title underline col-xs-8 text-center'>
                    <span className='pm-credits-text block bold sans'>
                      {capture}
                    </span>
                  </div>
                  <div className='col-xs-2'>{/* <!-- LEAVE EMPTY --> */}</div>
                  <div className='Certificate__course_code'>
                    Course code {contentID}
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xs-12'>
              <div className='row'>
                <div className='pm-certificate-footer'>
                  <div className='col-xs-4 pm-certified col-xs-4 text-center'>
                    <span className='pm-credits-text block sans'>
                      Open Internet Education District Academy
                    </span>
                    <span className='pm-empty-space block underline'></span>
                    <span className='bold block'>
                      {specName}, {specTitle}
                    </span>
                  </div>
                  <div className='col-xs-4'>{/* <!-- LEAVE EMPTY --> */}</div>
                  <div className='col-xs-4 pm-certified col-xs-4 text-center'>
                    <span className='pm-credits-text block sans'>
                      Date Completed {dateString}
                    </span>
                    <span className='pm-empty-space block underline'></span>
                    <span className='bold block'></span>
                    <span className='bold block'></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoaderOverlay />
    </div>
  )
}

// export const Certificate: React.ComponentClass<any> = withRouter(
//   CertificateOrigin
// )

// Basic example how styled-componemts work
const StyledSection = styled.section`
  .Certificate {
    text-align: center;

    .cursive {
      font-family: 'Pinyon Script', cursive;
    }

    .sans {
      font-family: 'Open Sans', sans-serif;
    }

    .bold {
      font-weight: bold;
    }

    .block {
      display: block;
    }

    .underline {
      border-bottom: 1px solid #777;
      padding: 5px;
      margin-bottom: 15px;
    }

    .margin-0 {
      margin: 0;
    }

    .padding-0 {
      padding: 0;
    }

    .pm-empty-space {
      height: 40px;
      width: 100%;
    }

    body {
      padding: 20px 0;
      background: #ccc;
    }

    .pm-certificate-container {
      position: relative;
      width: 800px;
      height: 600px;
      background-color: #618597;
      padding: 30px;
      color: #333;
      font-family: 'Open Sans', sans-serif;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      background: -webkit-repeating-linear-gradient(
        45deg,
        #618597,
        #618597 1px,
        #b2cad6 1px,
        #b2cad6 2px
      );
      background: repeating-linear-gradient(
        90deg,
        #618597,
        #618597 1px,
        #b2cad6 1px,
        #b2cad6 2px
      );

      .outer-border {
        width: 794px;
        height: 594px;
        position: absolute;
        left: 50%;
        margin-left: -397px;
        top: 50%;
        margin-top: -297px;
        border: 2px solid #fff;
      }

      .inner-border {
        width: 730px;
        height: 530px;
        position: absolute;
        left: 50%;
        margin-left: -365px;
        top: 50%;
        margin-top: -265px;
        border: 2px solid #fff;
      }

      .pm-certificate-border {
        position: relative;
        width: 720px;
        height: 520px;
        padding: 0;
        border: 1px solid #e1e5f0;
        background-color: rgba(255, 255, 255, 1);
        background-image: none;
        left: 50%;
        margin-left: -360px;
        top: 50%;
        margin-top: -260px;

        .pm-certificate-block {
          width: 650px;
          height: 200px;
          position: relative;
          left: 50%;
          margin-left: -325px;
          top: 70px;
          margin-top: 0;
        }

        .pm-certificate-header {
          margin-bottom: 10px;
        }

        .pm-certificate-title {
          position: relative;
          top: 40px;

          h2 {
            font-family: 'Pinyon Script', cursive;
            font-size: 34px !important;
          }
        }

        .pm-certificate-body {
          padding: 20px;

          .pm-name-text {
            font-size: 20px;
          }
        }

        .pm-earned {
          margin: 15px 0 20px;
          .pm-earned-text {
            font-size: 20px;
          }
          .pm-credits-text {
            font-size: 15px;
          }
        }

        .pm-course-title {
          .pm-earned-text {
            font-size: 20px;
          }
          .pm-credits-text {
            font-size: 15px;
          }
        }

        .pm-certified {
          font-size: 12px;

          .underline {
            margin-bottom: 5px;
          }
        }

        .pm-certificate-footer {
          width: 650px;
          height: 100px;
          position: relative;
          left: 50%;
          margin-left: -325px;
          bottom: -105px;
        }
      }
    }
  }
`
