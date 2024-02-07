import { JIRAHourConfigArgs, JIRAHourState } from './types'

export const createHour = (...args: JIRAHourConfigArgs) => {
        const onMount = (el: Element) => {}

        const onClean = () => {}

        const ref = (el: unknown) => {
                if (el) {
                        onMount(el as Element)
                } else onClean()
        }

        const state = ref as unknown as JIRAHourState

        return state
}
