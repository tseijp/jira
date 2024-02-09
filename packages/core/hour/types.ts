import {
        JIRASharedConfig,
        JIRAConfig,
        JIRAState,
        JIRAConfigArgs,
} from './../types'

export interface JIRABoardSharedConfig {
        DATE: string
        HOUR: string
        dateReg: string
        hourReg: string
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
        task?: string
        label?: string
        detail?: string
        // calculated
        duration?: number
}

export type JIRADateHour = JIRAHour[] & {
        first?: JIRAHour
        last?: JIRAHour
        // calculated
        duration?: number
        total?: number
        rest?: number
}

export type JIRAHours<T extends string = string> = Map<T, JIRADateHour>
