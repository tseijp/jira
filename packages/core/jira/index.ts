import { parseConfigArgs } from './config'
import { getElement, writeClipboard, isE } from '../utils'
import { JIRABoardConfigArgs, JIRABoardState } from './types'
import { convertHtmlToElement } from './convert'

export * from './render'
export * from './config'
export * from './convert'
export * from './types'

export const createJIRABoard = (...args: JIRABoardConfigArgs) => {
        const onMount = (el: Element) => {
                state.target = getElement(config.target) || el
                if (!isE(state.target)) return
                const markdown = state.target.innerHTML
                if (markdown) {
                        state.markdown = markdown
                        convertHtmlToElement(state)
                }

                state.button = getElement(config.button)!
                if (!isE(state.button)) return
                state.button.addEventListener('click', onClick)
        }

        const onClean = () => {
                if (!isE(state.button)) return
                state.button.removeEventListener('click', onClick)
        }

        const onClick = () => {
                convertHtmlToElement(state)
                writeClipboard(state.result)
        }

        const onChange = (e: any) => {
                console.log(e)
                const markdown = e.target.value
                if (!markdown || markdown === state.markdown) return
                state.markdown = markdown
                convertHtmlToElement(state)
        }

        const ref = (el: unknown) => {
                if (el) {
                        onMount(el as Element)
                } else onClean()
        }

        const config = parseConfigArgs(...args)

        const state = ref as unknown as JIRABoardState

        Object.assign(state, {
                ...config,
                ref,
                onMount,
                onClean,
                onClick,
                onChange,
        })

        return state
}

export default createJIRABoard

// window.addEventListener('DOMContentLoaded', createJIRA('pre'))
