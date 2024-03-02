export interface HourItemProps {
        hour: any
}

export default function BoardItem(props: HourItemProps) {
        const { hour } = props

        return (
                <div>
                        <div
                                className="
                                        p-4
                                        bg-white
                                        border
                                        items-center
                                        jiustify-center
                                        border-gray-200
                                        shadow-sm
                                        rounded-lg
                                        hover:shadow-md
                                        hover:border-indigo-600
                                        hover:border-4
                                "
                        >
                                <h3
                                        className="
                                                text-2xl
                                                font-bold
                                                text-gray-900
                                                hover:text-indigo-600
                                        "
                                >
                                        <a href={`/board/${hour.id}`}>
                                                [id{hour.id}]{hour.title}
                                        </a>
                                </h3>
                                <pre>{hour.content}</pre>
                                <button>{hour.created_at}</button>
                                <button>{hour.updated_at}</button>
                                <button>EDIT</button>
                        </div>
                </div>
        )
}
