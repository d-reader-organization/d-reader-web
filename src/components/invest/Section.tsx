import { InterestProject } from '@/app/lib/data/invest/projectsData'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { SectionSlider } from '../shared/SectionSlider'
import { AnnouncementIcon } from '../icons/AnnouncementIcon'

type Props = {
  data: InterestProject[]
  title: string
}

export const InvestSection: React.FC<Props> = ({ data, title }) => {
  return (
    <SectionSlider title={title}>
      {data.map((project) => (
        <div
          key={project.title}
          className={cn(
            'flex flex-[0_0_100%] min-w-0 xs:flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_50%] pr-4 md:pr-6 lg:flex-[0_0_33.333%]'
          )}
        >
          <Link
            href={RoutePath.InvestDetails(project.slug)}
            prefetch={false}
            className='relative max-h-[382px] min-h-[382px] rounded-xl hover:brightness-125 w-[100%]'
          >
            <Image alt={project.title} src={project.image} className='object-cover rounded-xl' fill />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
            <div className='relative z-10 p-4 md:p-6 flex flex-col gap-2 justify-end h-full'>
              <h2 className='text-xl md:text-2xl font-semibold md:font-bold leading-[20px] md:leading-[24px] max-md:tracking-[0.04px]'>
                {project.title}
              </h2>
              <div className='inline-flex items-center gap-2'>
                <AnnouncementIcon className='size-6' />
                <div className='flex max-md:flex-col md:items-center gap-1'>
                  <p className='text-base max-md:leading-[16px] md:text-2xl font-bold'>{project.stats.likes}</p>
                  <p className='text-[10px] md:text-xs font-bold text-grey-100'>PEOPLE EXPRESSED INTEREST</p>
                </div>
              </div>
              <div className='flex flex-wrap gap-2'>
                {project.tags.map((tag, index) => (
                  <div
                    className={cn(
                      'flex justify-center items-center h-[28px] p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-[25px]',
                      index === 0 && 'bg-transparent border border-grey-100'
                    )}
                    key={`${tag}-${index}`}
                  >
                    <p className='text-[10px] leading-normal md:text-base font-medium text-grey-100'>{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </SectionSlider>
  )
}
