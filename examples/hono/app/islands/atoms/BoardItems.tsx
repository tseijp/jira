export default function BoardItems(props: any) {
        return (
                <div
                        {...props}
                        className="
                                        grid
                                        gap-4
                                        grid-cols-1
                                        sm:grid-cols-2
                                        md:grid-cols-3
                                        lg:grid-cols-4
                                        2xl:grid-cols-6
                                        max-w-3xl
                                        mx-auto
                                        bg-white
                                "
                ></div>
        )
}
