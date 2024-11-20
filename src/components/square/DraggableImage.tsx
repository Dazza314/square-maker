import { useDraggable } from "@dnd-kit/core";
import { ItemInfo } from "../../types";

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

  const proxyUrl = getProxyUrl(imageUrl);

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

export function getProxyUrl(imageUrl: string) {
  return `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
}

export default DraggableImage;
