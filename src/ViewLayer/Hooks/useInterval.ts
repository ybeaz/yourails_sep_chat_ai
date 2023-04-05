import { useRef, useState, useEffect } from 'react'

type CallableType = (...args: any[]) => any

/**
 * @description Reeact hook to provide periodic function call
 * @link https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @link https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
 */
export const useInterval = (
  callback: CallableType,
  delay: number,
  isSlideShow: boolean
) => {
  const savedCallback = useRef(callback)
  const [intervalId, setIntervalId] = useState(0)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (isSlideShow) {
      let id = window.setInterval(tick, delay)
      setIntervalId(id)
      return () => clearInterval(id)
    } else {
      clearInterval(intervalId)
      return () => clearInterval(intervalId)
    }
  }, [delay, isSlideShow])
}
