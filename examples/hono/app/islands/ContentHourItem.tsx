export interface ContentHourItemProps {
        hour: any
}

export const ContentHourItem = (props: ContentHourItemProps) => {
        const { hour } = props

        return (
                <div>
                        <div>
                                <h3>
                                        <a href={`/board/id/${hour.id}`}>
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
