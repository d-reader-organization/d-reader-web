export type Nullable<T> = T | null

export type CommonDialogProps = { open: boolean; toggleDialog: () => void }
export type ComicIssuePageParams = {
  params: {
    id: string
  }
}

export type ParsedFormError = { message: string; paths: Array<string | number> }
