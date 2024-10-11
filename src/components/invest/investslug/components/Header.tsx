import React from 'react'

type HeaderProps = {
  title: string
  subtitle: string
  className?: string
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className }) => {
  return (
    <div className='flex flex-col justify-center items-center md:gap-4 md:pb-[54px]'>
      <h1 className="text-white font-semibold tracking-tight leading-none md:text-[40px]">
        {title}
      </h1>
      <p className="text-white text-base font-medium leading-snug">
        {subtitle}
      </p>
    </div>
  )
}

export default Header