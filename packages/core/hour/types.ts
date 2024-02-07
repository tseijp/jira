import {
        JIRASharedConfig,
        JIRAConfig,
        JIRAState,
        JIRAConfigArgs,
} from './../types'

export interface JIRABoardSharedConfig extends JIRASharedConfig {}

export interface JIRAHourConfig extends JIRAConfig, JIRABoardSharedConfig {}

export interface JIRAHourState extends JIRAState, JIRABoardSharedConfig {}

export type JIRAHourConfigArgs = JIRAConfigArgs<
        string | Element,
        Partial<JIRAHourConfig>
>

export interface JiraHour {
        from?: string
        to?: string
        time?: number
        task?: string
        label?: string
        detail?: string
}

export type JIRAHours<T extends string = string> = Map<T, JiraHour[]>
