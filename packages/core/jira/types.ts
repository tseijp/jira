export interface JIRABoardSharedConfig {
        // for parser
        TITLE: string
        LABEL: string
        TICKET: string
        BACKLOG: string
        configOverride?: object
}

export interface JIRABoardConfig extends JIRABoardSharedConfig {
        // for base config
        target?: string | Element
        button?: string | Element
        select?: string | Element
        input?: string | Element
}

export interface JIRABoardState extends JIRABoardSharedConfig {
        // ref
        (e?: Event | Element): void

        // for base coinfig
        target: Element
        button: Element
        select: Element
        input: Element

        ref: (el: unknown) => void
        onMount: (el?: Element) => void
        onClean: () => void
        onClick: () => void
        onChange: (e: any) => void

        // state
        markdown: string
        result: string
        results: string[]
        tickets: JIRATickets
        backlog: JIRATicket[]
        columns: string[]
}

export type JIRABoardConfigArgs<
        S extends string | Element = string | Element,
        T extends Partial<JIRABoardConfig> = Partial<JIRABoardConfig>
> =
        | [config?: T]
        | [target?: S, config?: T]
        | [target?: S, button?: S, config?: T]
        | [target?: S, button?: S, select?: S, config?: T]
        | [target?: S, button?: S, select?: S, input?: S, config?: T]

export interface JIRATicket {
        task?: string
        order?: number
        column?: string
        detail?: string
}

export type JIRATickets<T extends string = string> = Map<T, JIRATicket[]>
