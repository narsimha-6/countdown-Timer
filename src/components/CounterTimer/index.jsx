import {useEffect, useState} from 'react'
import './index.css'

const CounterTimer = () => {
  const [minutes, setMinutes] = useState('')
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)
  const [isActive, setActive] = useState(false)
  const [isPaused, setPaused] = useState(false)

  // Handle input changes
  const handleInput = event => {
    const value = event.target.value
    const parsedMinutes = Number(value)

    setMinutes(value)

    if (value === '' || !Number.isFinite(parsedMinutes)) {
      setDuration(0)
      setTime(0)
    } else {
      const seconds = Math.max(0, Math.floor(parsedMinutes * 60))
      setDuration(seconds)
      setTime(seconds)
    }

    setActive(false)
    setPaused(false)
  }

  // Start timer
  const handleStart = () => {
    if (time > 0) {
      setActive(true)
      setPaused(false)
    } else if (duration > 0) {
      setTime(duration)
      setActive(true)
      setPaused(false)
    }
  }

  // Format time as MM:SS
  const formatTime = () => {
    const displayMinutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')

    return `${displayMinutes}:${seconds}`
  }

  // Countdown logic
  useEffect(() => {
    if (!isActive || isPaused || time <= 0) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setTime(currentTime => {
        if (currentTime <= 1) {
          window.clearInterval(intervalId)
          setActive(false)
          return 0
        }

        return currentTime - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isActive, isPaused, time])

  // Pause or resume timer
  const handlePause = () => {
    if (isActive) {
      setPaused(previousState => !previousState)
    }
  }

  // Reset timer
  const handleReset = () => {
    setActive(false)
    setPaused(false)
    setTime(duration)
  }

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>

      <div className="timer-display">
        <input
          type="number"
          min="0"
          step="1"
          value={minutes}
          placeholder="Enter time in minutes"
          onChange={handleInput}
          disabled={isActive}
        />

        <div>{formatTime()}</div>

        <div className="timer-controls">
          <button
            onClick={handleStart}
            disabled={isActive && !isPaused}
          >
            Start
          </button>

          <button onClick={handlePause} disabled={!isActive}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default CounterTimer