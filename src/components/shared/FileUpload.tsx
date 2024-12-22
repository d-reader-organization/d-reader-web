'use client'

import React, { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '../ui'
import { Loader } from './Loader'

type UploadedFile = { url: string; file: File | undefined }

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  allowMultipleFiles?: boolean
  onUpload?: (uploadedFiles: UploadedFile[]) => void
  previewUrl?: string
  sortable?: boolean
  isUploading?: boolean
}

const FileUpload = forwardRef<HTMLInputElement, Props>(function FileUpload(
  { id, allowMultipleFiles = false, previewUrl = '', onUpload = () => {}, className = '', isUploading },
  ref
) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    previewUrl ? [{ url: previewUrl, file: undefined }] : []
  )

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const files = event.target.files
    if (files) {
      const uploads: UploadedFile[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file) continue
        const url = URL.createObjectURL(file)
        uploads.push({ url, file })
      }
      const newFiles = allowMultipleFiles ? uploadedFiles.concat(uploads) : uploads
      setUploadedFiles(newFiles)
      onUpload(newFiles)
    }
  }

  const handleUnsetFiles = () => {
    setUploadedFiles([])
    onUpload([])
  }

  useEffect(() => {
    if (previewUrl) {
      const previewFile = [{ url: previewUrl, file: undefined as unknown as File }]
      setUploadedFiles(previewFile)
      onUpload(previewFile)
    }
  }, [onUpload, previewUrl])

  const isPhotoSelected = uploadedFiles.length > 0

  return (
    <div className={cn('flex flex-row justify-between items-center w-full', className)}>
      <div className='mb-2'>
        {isPhotoSelected ? (
          <div>
            {uploadedFiles.map((uploadedFile) => (
              <div key={uploadedFile.url}>
                {uploadedFile.file?.type.includes('pdf') ? (
                  <embed src={uploadedFile.url} width='80px' height='80px' />
                ) : (
                  <div className='w-[80px] h-[80px] z-1 overflow-hidden rounded-[100px]'>
                    <Image src={uploadedFile.url} width={500} height={500} alt='' />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='w-[80px] h-[80px] z-1 overflow-hidden rounded-[100px]'>
            <Image
              src={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/anon-bunny.png`}
              width={500}
              height={500}
              alt=''
            />
          </div>
        )}
      </div>
      <div className='flex gap-2'>
        {isPhotoSelected ? (
          <Button variant='ghost' size='md' className='w-fit' onClick={handleUnsetFiles}>
            Remove photo
          </Button>
        ) : null}
        <Button variant='secondary' size='md' className='relative overflow-hidden'>
          <input
            id={id}
            type='file'
            multiple={allowMultipleFiles}
            className='absolute inset-0 opacity-0 cursor-pointer z-10'
            onChange={handleFileChange}
            ref={(el) => {
              // Use a callback ref to set the ref correctly
              if (ref && typeof ref === 'function') {
                ref(el)
              } else if (ref) {
                ref.current = el // Ensure type safety
              }
            }}
          />
          {isUploading ? <Loader /> : isPhotoSelected ? 'Change photo' : 'Upload photo'}
        </Button>
      </div>
    </div>
  )
})

export default FileUpload
