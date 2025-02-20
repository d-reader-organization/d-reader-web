import { SignatureRequestStatus } from '@/enums/signatureRequest'
import { BasicUser } from '../user'
import { BasicCollectibleComic } from '.'

export interface SignatureRequest {
  collectibleComic: BasicCollectibleComic
  user: BasicUser
  requestedAt: string
  resolvedAt?: string
  status: SignatureRequestStatus
}
