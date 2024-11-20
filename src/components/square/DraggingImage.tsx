import ImageLoading from "../Image/ImageLoading";
import { useProxyImageUrl } from "./useProxyImageUrl";

type Props = {
  imageUrl: string;
};

function DraggingImage({ imageUrl }: Props) {
  const [loading, proxyUrl] = useProxyImageUrl(imageUrl);

  if (loading || proxyUrl === null) {
    return <ImageLoading />;
  }

  return <img src={proxyUrl} style={{ height: 200 }} />;
}

export default DraggingImage;
