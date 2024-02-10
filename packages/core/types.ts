export interface JIRASharedConfig {
        // for parser
        TITLE: string
        LABEL: string
        title: string
        label: string
}

export interface JIRAConfig extends JIRASharedConfig {
        // for base config
        target?: string | Element
        button?: string | Element
        select?: string | Element
        input?: string | Element
}

export interface JIRAState extends JIRASharedConfig {
        // ref
        (e?: Event | Element): void
        convert<T extends JIRAState>(state: T): void
        markdown: string
        results: string[]
        result: string

        // for base coinfig
        target: Element
        button: Element
        select: Element
        input: Element

        ref: (el: unknown) => void
        onMount: (el?: Element) => void
        onClean: () => void
        onClick: () => void
        onSelect: (e: any) => void
        onChange: (e: any) => void
}

export type JIRAConfigArgs<
        S extends string | Element = string | Element,
        T extends Partial<JIRAConfig> = Partial<JIRAConfig>
> =
        | [config?: T]
        | [target?: S, config?: T]
        | [target?: S, button?: S, config?: T]
        | [target?: S, button?: S, select?: S, config?: T]
        | [target?: S, button?: S, select?: S, input?: S, config?: T]
