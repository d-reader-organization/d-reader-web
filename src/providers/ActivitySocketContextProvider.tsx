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
  findItemsFromQueue: () => void
  isConnected: boolean
}

const ActivitySocketContext = createContext<ActivitySocketContext | undefined>(undefined)

const ROOM_ID = 'activity'
const ACTIVITY_NOTIFICATION_EVENT = 'activity-notification'

type ActivitySocketContextProps = {
  me: User | null
} & PropsWithChildren

const queue: {
  items: ActivityNotification[]
  add: (item: ActivityNotification) => void
  remove: (item: ActivityNotification) => void
} = {
  items: [],
  add(item) {
    this.items = [...this.items, item]
  },
  remove(item) {
    this.items = this.items.filter((value) => value.createdAt !== item.createdAt)
  },
}

export const ActivitySocketProvider: React.FC<ActivitySocketContextProps> = ({ children, me }) => {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()
  let isToastShown = false

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_ENDPOINT ?? '', {
      transports: ['websocket'],
    })

    socketRef.current.on('connect', () => {
      setIsConnected(true)
      joinRoom(ROOM_ID)
      // console.log(`connected and joined in the room ${ROOM_ID}`)
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

  const getNotificationsFromQueue = () => {
    const newNotification = queue.items.at(0)
    if (!newNotification) {
      return
    }
    const MAX_NOTIFICATIONS_SIZE = 5
    const notifications = queue.items
      .filter((value) => value.type === newNotification.type)
      .slice(0, MAX_NOTIFICATIONS_SIZE)
    notifications.forEach((notif) => queue.remove(notif))
    return notifications
  }

  const displayToast = (notifications: ActivityNotification[]) => {
    isToastShown = true
    toast({
      description: <ActivityNotificationWidget notifications={notifications} />,
      onOpenChange: (open) => {
        const newNotifications = getNotificationsFromQueue()
        if (newNotifications?.length) {
          displayToast(newNotifications)
          return
        }
        isToastShown = open
      },
    })
  }

  const subscribeToEvent = (event: string) => {
    if (socketRef.current) {
      socketRef.current.on(event, (data: ActivityNotification) => {
        if (data.user.id === me?.id) {
          return
        }
        // if (data.type === ActivityNotificationType.ExpressedInterest && currentPage == Kickstarter) {
        //   // twitch notification
        //   return
        // }
        queue.add(data)
        if (isToastShown) {
          return
        }
        const notifications = getNotificationsFromQueue()
        if (notifications?.length) {
          displayToast(notifications)
        }
      })
    }
  }

  const unsubscribeFromEvent = (event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event)
    }
  }

  return (
    <ActivitySocketContext.Provider
      value={{
        socket: socketRef.current,
        joinRoom,
        leaveRoom,
        isConnected,
        findItemsFromQueue: getNotificationsFromQueue,
      }}
    >
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
