import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'

type Props = {
  videoUrl: string
  title?: string
} & CommonDialogProps

export const YoutubeVideoDialog: React.FC<Props> = ({ videoUrl, open, toggleDialog, title }) => {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='max-w-[1080px] h-auto p-0 bg-transparent' hideCloseIcon>
        <iframe
          src={`${videoUrl}&autoplay=0&controls=1&mute=0&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&vq=hd720`}
          className='w-full h-auto aspect-video rounded-lg'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          title={title}
          referrerPolicy='strict-origin-when-cross-origin'
        />
      </DialogContent>
    </Dialog>
  )
}
