import { JIRAConfig, JIRAState } from './types'
import { getElement, writeClipboard, parseConfig, isE } from './utils'

export const create = <
        T extends JIRAState = JIRAState,
        C extends JIRAConfig = JIRAConfig,
        Arg extends C[keyof C] | Partial<C> = C[keyof C] | Partial<C>
>(
        defaultConfig: C,
        ...args: Arg[]
) => {
        const update = () => {
                state.convert(state)
                if (isE(state.target)) state.target.innerHTML = state.result
        }

        const onMount = (el: Element) => {
                state.target = getElement(config.target) || el
                if (!isE(state.target)) return
                const markdown = state.target.innerHTML
                if (markdown) {
                        state.markdown = markdown
                        update()
                }

                state.button = getElement(config.button)!
                state.select = getElement(config.select)!
                state.input = getElement(config.input)!
                if (isE(state.button))
                        state.button.addEventListener('click', onClick)
                if (isE(state.select))
                        state.select.addEventListener('change', onSelect)
                if (isE(state.input))
                        state.input.addEventListener('change', onChange)
        }

        const onClean = () => {
                if (isE(state.button))
                        state.button.removeEventListener('click', onClick)
                if (isE(state.select))
                        state.select.removeEventListener('change', onSelect)
                if (isE(state.input))
                        state.input.removeEventListener('change', onChange)
        }

        const onClick = () => {
                update()
                writeClipboard(state.result)
        }

        const onChange = (e: any) => {
                const markdown = e.target.value
                if (!markdown || markdown === state.markdown) return
                state.markdown = markdown
                update()
        }

        const onSelect = (e: any) => {
                const label = e.target.value
                if (!label || label === state.label) return
                state.label = label
                update()
        }

        const ref = (el: Element) => {
                if (el) {
                        onMount(el)
                } else onClean()
        }

        const config = parseConfig(defaultConfig, ...args)

        const state = ref as unknown as T

        Object.assign(state, {
                ...config,
                ref,
                onMount,
                onClean,
                onClick,
                onChange,
                convert: () => {}, // abstract method
        })

        return state
}

// window.addEventListener('DOMContentLoaded', createJIRA('pre'))
