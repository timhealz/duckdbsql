import { Table } from 'apache-arrow'

export type ExecutedQuery = {
    id: number,
    text: string,
    data: Table | undefined,
    startTime: string,
    duration: number,
    status: string,
    error: Error | undefined,
}

