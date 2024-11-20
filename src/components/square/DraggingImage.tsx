import ImageLoading from "../Image/ImageLoading";
import { useProxyImageUrl } from "./useProxyImageUrl";

type Props = {
  imageUrl: string;
};

function DraggingImage({ imageUrl }: Props) {
  return (
    <div>
      <DraggingImageContent imageUrl={imageUrl} />
    </div>
  );
}

function DraggingImageContent({ imageUrl }: Props) {
  const [loading, proxyUrl] = useProxyImageUrl(imageUrl);

  if (loading || proxyUrl === null) {
    return <ImageLoading />;
  }

  return (
    <img
      style={{ height: 200 }}
      src={proxyUrl}
    />
  );
}

export default DraggingImage;
