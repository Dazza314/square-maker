import { useDraggable } from "@dnd-kit/core";
import { ItemInfo } from "../../types";
import ImageLoading from "../Image/ImageLoading";
import { useProxyImageUrl } from "./useProxyImageUrl";

type Props = ItemInfo;

function DraggableImage({ imageUrl }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: imageUrl,
  });
  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
    : undefined;

  const [loading, proxyUrl] = useProxyImageUrl(imageUrl);

  if (loading || proxyUrl === null) {
    return <ImageLoading />;
  }

  return (
    <img
      ref={setNodeRef}
      style={style}
      src={proxyUrl}
      {...listeners}
      {...attributes}
    />
  );
}

export default DraggableImage;
