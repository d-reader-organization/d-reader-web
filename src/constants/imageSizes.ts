type AspectRatio = {
  width: number
  height: number
}

export const ASPECT_RATIO = Object.freeze({
  COMIC_COVER: { width: 900, height: 1000 },
  COMIC_BANNER: { width: 1920, height: 900 },
  COMIC_ISSUE_COVER: { width: 1024, height: 1484 },
  CREATOR_BANNER: { width: 1920, height: 900 },
  CREATOR_AVATAR: { width: 500, height: 500 },
})

export const COMIC_COVER_SIZE: AspectRatio = { width: 900, height: 1000 }
export const COMIC_BANNER_SIZE: AspectRatio = { width: 1920, height: 900 }
export const COMIC_ISSUE_COVER_SIZE: AspectRatio = { width: 1024, height: 1484 }
export const CREATOR_BANNER_SIZE: AspectRatio = { width: 1920, height: 900 }
export const CREATOR_AVATAR_SIZE: AspectRatio = { width: 500, height: 500 }
