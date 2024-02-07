export const DemoTextarea = (props: any) => {
        return (
                <textarea
                        {...props}
                        style={{
                                minWidth: '33%',
                                padding: '16px 0px',
                                margin: 0,
                                border: 'none',
                                outline: 'none',
                                background: 'none',
                                resize: 'none',
                        }}
                />
        )
}
