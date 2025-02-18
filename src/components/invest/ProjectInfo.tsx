'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Text } from '../ui'
import { MinusIcon } from '../icons/theme/MinusIcon'
import { PlusIcon } from '../icons/theme/PlusIcon'

type ProjectInfoProps = {
  info: InfoItemProps[]
}

type InfoItemProps = {
  section: string
  text: string
  image?: string
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ info }) => {
  return (
    <section className='w-full flex flex-col justify-center align-center'>
      <div className='flex flex-col'>
        {info.map((item, index) => (
          <InfoItem key={index} item={item} isFirst={index === 0} isLast={index === info.length - 1} />
        ))}
      </div>
    </section>
  )
}

/** @deprecated Use the Collapsible component for the Accordion effect */
const InfoItem: React.FC<{ item: InfoItemProps; isFirst?: boolean; isLast?: boolean }> = ({
  item,
  isFirst,
  isLast,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState('0px')
  const [isCollapsing, setIsCollapsing] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined

    if (isExpanded) {
      setMaxHeight(contentRef.current?.scrollHeight + 'px')
    } else {
      setIsCollapsing(true)
      setMaxHeight(contentRef.current?.scrollHeight + 'px')
      timeoutId = setTimeout(() => {
        setMaxHeight('0px')
      }, 10)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isExpanded])

  const handleTransitionEnd = () => {
    if (!isExpanded) {
      setIsCollapsing(false)
      setMaxHeight('0px')
    }
  }

  return (
    <div
      className={cn(
        'border-t border-grey-300',
        isFirst && 'border-t-0',
        isLast && 'border-b',
        isExpanded && 'border-b-0'
      )}
    >
      <button
        className={cn(
          'flex justify-between items-center py-4 md:flex-row w-full text-left md:py-8 focus:outline-none',
          isExpanded ? 'flex-col' : ''
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h1
          className={cn(
            'flex items-start min-w-[98px] self-start text-white text-xl font-semibold leading-none mt-1 md:mt-[3px] tracking-tight font-obviouslyNarrow',
            isExpanded ? 'pb-2' : ''
          )}
        >
          {item.section}
        </h1>

        <div className='flex flex-col justify-center align-center w-full md:min-w-[300px] md:max-w-[600px]'>
          <div
            ref={contentRef}
            className='transition-all duration-200 ease-in-out text-sm md:text-base  font-medium leading-[140%]'
            style={{
              maxHeight: maxHeight,
              overflow: 'hidden',
              opacity: isExpanded || isCollapsing ? 1 : 0,
              transition: 'max-height 0.6s ease, opacity 0.3s ease',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className='flex flex-col justify-center items-start gap-4 relative w-full'>
              <Text as='p' styleVariant='body-normal' className='whitespace-pre-line'>
                {item.text}
              </Text>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.section + ' image'}
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover' }}
                  className='w-full h-auto'
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex h-auto min-w-[40px] md:min-w-[50px] self-start justify-end'>
          {isExpanded ? (
            <div className='flex flex-col max-md:hidden'>
              <MinusIcon className='size-6 text-gray-200 transition-transform duration-200 self-end' />
            </div>
          ) : (
            <PlusIcon className='size-6 text-gray-200 transition-transform duration-200 self-end' />
          )}
        </div>
      </button>
    </div>
  )
}
