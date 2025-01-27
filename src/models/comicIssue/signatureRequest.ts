import { SignatureRequestStatus } from '@/enums/signatureRequest'
import { BasicCollectibleComic } from '../comic/collectibleComic'
import { BasicUser } from '../user'

export interface SignatureRequest {
  asset: BasicCollectibleComic
  user: BasicUser
  requestedAt: string
  resolvedAt?: string
  status: SignatureRequestStatus
}
