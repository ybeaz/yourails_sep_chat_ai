import React from 'react'
import { Platform } from 'react-native'
import {
  useRouteError,
  Navigate,
  RouteObject as RouteObjectType,
  useRoutes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'

import { historyWeb } from './historyWeb'
import { withDelayYrl } from '../YrlNativeViewLibrary'
import { PageChatsWholeScreen } from '../ViewLayer/Screens/PageChatsWholeScreen/PageChatsWholeScreen'

const pathAfterStatic = window?.location?.pathname.split('/static/')[1]
const pathTo = `/static/${pathAfterStatic}`

function ErrorBoundary(props: any) {
  const path = props?.path
  let error = useRouteError()
  console.error(error)

  return (
    <div>
      ErrorBoundary! <br />
      pathname: {`${window && window?.location?.pathname}`} <br /> path:{' '}
      {`${path}`}
      <br />
      error: {`${error}`}
    </div>
  )
}

const routes: RouteObjectType[] = [
  {
    path: '/:urlParam1?/:urlParam2?/static/media/*',
    element: <Navigate to={pathTo} replace />,
    // element: (
    //   <div>
    //     Caught it <br />
    //     pathname: {`${window.location.pathname}`} <br /> path:
    //     /:urlParam1?/:urlParam2?/static/media/*
    //   </div>
    // ),
    children: [],
    errorElement: <ErrorBoundary path='/:urlParam1?/static/media/*' />,
  },
  {
    path: '/',
    element: <PageChatsWholeScreen />,
    children: [],
    errorElement: <ErrorBoundary path='/' />,
  },
  {
    path: '/:urlParam1?/:urlParam2?/:urlParam3?',
    element: <PageChatsWholeScreen />,
    children: [],
    errorElement: <ErrorBoundary path='/:urlParam1?/:urlParam2?/:urlParam3?' />,
  },
  {
    path: '*',
    element: <div>No Match</div>,
    children: [],
    errorElement: <ErrorBoundary path='*' />,
  },
]

const RouterCreated = () => {
  let routesCreated = useRoutes(routes)
  return routesCreated
}

/**
 * @description Component to provide routing in one place
 * @links https://reactrouter.com/en/main/hooks/use-routes
 * @link
 */
export const NavigationWeb: React.FunctionComponent<any> = withDelayYrl({
  delay: 100,
})(() => {
  if (Platform.OS !== 'web') return null

  return (
    <HistoryRouter history={historyWeb}>
      <RouterCreated />
    </HistoryRouter>
  )
})
