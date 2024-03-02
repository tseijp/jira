import { useOnce } from '../utils'

const createResetheight = (el: HTMLTextAreaElement | null) => {
        if (!el) return
        el.tabIndex = -1
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
}

export default function FormTextarea(props: any) {
        const ref = useOnce(() => createResetheight)
        return (
                <textarea
                        ref={ref}
                        {...props}
                        rows={10}
                        className="
                                flex-1
                                p-2
                                text-gray-700
                                placeholder-gray-400
                                border-0
                                focus:outline-none
                                focus:ring-0
                                focus:border-transparent
                                resize-none
                        "
                />
        )
}
