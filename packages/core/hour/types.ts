import {
        JIRASharedConfig,
        JIRAConfig,
        JIRAState,
        JIRAConfigArgs,
} from './../types'

export interface JIRABoardSharedConfig {
        DATE: string
        HOUR: string
}

export interface JIRAHourConfig extends JIRAConfig, JIRABoardSharedConfig {}

export interface JIRAHourState extends JIRAState, JIRABoardSharedConfig {
        hours: JIRAHours
        columns: string[]
}

export type JIRAHourConfigArgs = JIRAConfigArgs<
        string | Element,
        Partial<JIRAHourConfig>
>

export interface JIRAHour {
        from?: string
        to?: string
        time?: number
        rest?: number
        task?: string
        label?: string
        detail?: string
}

export type JIRAHours<T extends string = string> = Map<T, JiraHour[]>
