import ImageLoading from "../Image/ImageLoading";
import { useProxyUrl } from "./DraggableImage";

type Props = {
  imageUrl: string;
};

function DraggingImage({ imageUrl }: Props) {
  const [loading, proxyUrl] = useProxyUrl(imageUrl);

  if (loading || proxyUrl === null) {
    return <ImageLoading />;
  }

  return <img src={proxyUrl} style={{ height: 200 }} />;
}

export default DraggingImage;
