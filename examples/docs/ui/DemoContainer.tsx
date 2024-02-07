export const DemoContainer = (props: any) => {
        return (
                <div
                        {...props}
                        style={{
                                display: 'flex',
                                position: 'relative',
                                width: '100%',
                                maxHeight: '512px',
                                padding: '0 16px',
                                overflow: 'scroll',
                        }}
                />
        )
}
