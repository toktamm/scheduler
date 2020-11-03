import { useState } from 'react';


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode]))
    } else {
      setHistory(prev => ([...prev, newMode]))
    }
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1)
      setHistory(newHistory)
      const newMode = newHistory[newHistory.length - 1]
      setMode(newMode)
    }

  }


  return { mode, transition, back };
}