
export type ExecutedQuery = {
    id: number,
    text: string,
    numRows: number | undefined,
    startTime: string,
    duration: number
  }