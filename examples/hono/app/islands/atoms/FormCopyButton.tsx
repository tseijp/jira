export default function FormCopyButton(props: any) {
        return (
                <button
                        {...props}
                        className="
                                inline-flex
                                items-center
                                justify-center
                                px-4
                                py-2
                                text-base
                                font-medium
                                text-white
                                bg-indigo-600
                                border-transparent
                                rounded-md
                                shadow-sm
                                hover:bg-indigo-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                                focus:ring-offset-2
                        "
                >
                        COPY
                </button>
        )
}
