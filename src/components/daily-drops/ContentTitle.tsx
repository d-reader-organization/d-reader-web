type Props = {
  title: string
}

export const DailyDropContentTitle: React.FC<Props> = ({ title }) => (
  <h1 className='text-white text-[56px] sm:text-[90px] xl:text-[120px] font-bold leading-none font-obviouslyNarrow uppercase mt-12 text-center'>
    {title}
  </h1>
)
