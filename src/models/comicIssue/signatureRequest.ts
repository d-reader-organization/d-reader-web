import { SignatureRequestStatus } from '@/enums/signatureRequest'
import { BasicUser } from '../user'
import { BasicCollectibleComic } from '../asset'

export interface SignatureRequest {
  asset: BasicCollectibleComic
  user: BasicUser
  requestedAt: string
  resolvedAt?: string
  status: SignatureRequestStatus
}
