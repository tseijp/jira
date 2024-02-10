import {
        JIRASharedConfig,
        JIRAConfig,
        JIRAState,
        JIRAConfigArgs,
} from '../types'

export interface JIRABoardSharedConfig extends JIRASharedConfig {
        // for parser
        TICKET: string
        BACKLOG: string
}

export interface JIRABoardConfig extends JIRAConfig, JIRABoardSharedConfig {}

export interface JIRABoardState<Key extends string = string>
        extends JIRAState,
                JIRABoardSharedConfig {
        // state
        tickets: JIRATickets
        backlog: JIRATicket[]
        columns: Set<Key>
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

export type JIRATickets<Key extends string = string> = Map<Key, JIRATicket[]>
