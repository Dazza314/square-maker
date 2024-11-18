type Props = {
    imageUrl: string
}

function DraggingImage({ imageUrl }: Props) {
    return <img src={imageUrl} style={{ height: 200 }}
    />
}

export default DraggingImage