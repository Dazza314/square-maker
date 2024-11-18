import { getProxyUrl } from "./DraggableImage";

type Props = {
    imageUrl: string
}

function DraggingImage({ imageUrl }: Props) {
    const proxyUrl = getProxyUrl(imageUrl);

    return <img src={proxyUrl} style={{ height: 200 }}
    />
}

export default DraggingImage