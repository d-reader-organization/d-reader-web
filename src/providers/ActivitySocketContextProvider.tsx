'use client'

import { ActivityNotification, ActivityNotificationWidget } from '@/components/shared/ActivityNotificationWidget'
import { useToast } from '@/components/ui/toast'
import { SOCKET } from '@/constants/general'
import { User } from '@/models/user'
import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type ActivitySocketContext = {
  socket: Socket | null
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
  isConnected: boolean
}

const ActivitySocketContext = createContext<ActivitySocketContext | undefined>(undefined)

const ROOM_ID = 'activity'
const ACTIVITY_NOTIFICATION_EVENT = 'activity-notification'

type ActivitySocketContextProps = {
  me: User | null
} & PropsWithChildren

export const ActivitySocketProvider: React.FC<ActivitySocketContextProps> = ({ children, me }) => {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_ENDPOINT ?? '', {
      transports: ['websocket'],
    })

    socketRef.current.on('connect', () => {
      setIsConnected(true)
      joinRoom(ROOM_ID)
      console.log(`connected and joined in the room ${ROOM_ID}`)
    })

    socketRef.current.on('disconnect', () => {
      setIsConnected(false)
      leaveRoom(ROOM_ID)
    })

    return () => {
      leaveRoom(ROOM_ID)
      socketRef.current?.disconnect()
    }
  }, [])

  const joinRoom = (roomId: string) => {
    if (socketRef.current) {
      socketRef.current.emit(SOCKET.JOIN_ROOM, { roomId })
      subscribeToEvent(ACTIVITY_NOTIFICATION_EVENT)
    }
  }

  const leaveRoom = (roomId: string) => {
    if (socketRef.current) {
      socketRef.current.emit(SOCKET.LEAVE_ROOM, { roomId })
      unsubscribeFromEvent(ACTIVITY_NOTIFICATION_EVENT)
    }
  }

  const subscribeToEvent = (event: string) => {
    if (socketRef.current) {
      socketRef.current.on(event, (data: ActivityNotification) => {
        if (data.user.id === me?.id) {
          return
        }
        toast({ description: <ActivityNotificationWidget notification={data} /> })
      })
    }
  }
  const unsubscribeFromEvent = (event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event)
    }
  }

  return (
    <ActivitySocketContext.Provider value={{ socket: socketRef.current, joinRoom, leaveRoom, isConnected }}>
      {children}
    </ActivitySocketContext.Provider>
  )
}

export const useActivityContext = () => {
  const context = useContext(ActivitySocketContext)
  if (!context) {
    throw new Error('useActivityContext must be used within a ActivitySocketProvider')
  }
  return context
}
