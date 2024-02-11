import {
        JIRASharedConfig,
        JIRAConfig,
        JIRAState,
        JIRAConfigArgs,
} from './../types'

export interface JIRABoardSharedConfig extends JIRASharedConfig {
        DATE: string
        HOUR: string
        dateReg: string
        hourReg: string
        labelReg: string
}

export interface JIRAHourConfig extends JIRAConfig, JIRABoardSharedConfig {}

export interface JIRAHourState<Key extends string = string>
        extends JIRAState,
                JIRABoardSharedConfig {
        hours: JIRAHours
        columns: Set<Key>
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
        disable?: boolean
        duration?: number
}

export type JIRADateHour = JIRAHour[] & {
        first?: JIRAHour
        last?: JIRAHour

        // calculated
        size?: number
        rest?: number
        total?: number
        duration?: number
}

export type JIRAHours<Key extends string = string> = Map<Key, JIRADateHour>
