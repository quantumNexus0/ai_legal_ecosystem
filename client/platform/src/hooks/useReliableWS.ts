import { useEffect, useRef, useCallback } from "react"

export function useReliableWS(url: string, onMessage: (d: unknown) => void) {
  const ws    = useRef<WebSocket | null>(null)
  const retry = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const connect = useCallback(() => {
    ws.current = new WebSocket(url)
    ws.current.onmessage = (e) => onMessage(JSON.parse(e.data))
    ws.current.onopen    = () => { retry.current = 0 }
    ws.current.onclose   = () => {
      const delay = Math.min(1000 * 2 ** retry.current, 30_000)
      retry.current++
      timer.current = setTimeout(connect, delay)
    }
  }, [url, onMessage])

  useEffect(() => {
    connect()
    return () => {
      clearTimeout(timer.current)
      ws.current?.close()
    }
  }, [connect])

  const send = (data: unknown) => ws.current?.send(JSON.stringify(data))
  return { send }
}
