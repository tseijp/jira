import {
        JIRASharedConfig,
        JIRAConfig,
        JIRAState,
        JIRAConfigArgs,
} from '../types'

export interface JIRABoardSharedConfig extends JIRASharedConfig {
        // for parser
        TITLE: string
        LABEL: string
        TICKET: string
        BACKLOG: string
}

export interface JIRABoardConfig extends JIRAConfig, JIRABoardSharedConfig {}

export interface JIRABoardState extends JIRAState, JIRABoardSharedConfig {
        // state
        tickets: JIRATickets
        backlog: JIRATicket[]
        columns: string[]
}

export type JIRABoardConfigArgs = JIRAConfigArgs<
        string | Element,
        Partial<JIRABoardConfig>
>

export interface JIRATicket {
        task?: string
        label?: string
        order?: number
        column?: string
        detail?: string
}

export type JIRATickets<T extends string = string> = Map<T, JIRATicket[]>
