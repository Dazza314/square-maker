import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../db/imageStore";
import { ItemInfo } from "../../types";
import ImageLoading from "../Image/ImageLoading";
import { isImageId } from "./squareUtils";

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

  const [loading, proxyUrl] = useProxyUrl(imageUrl);

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

export function useProxyUrl(
  imageUrl: string
): [isLoading: boolean, proxyUrl: string | null] {
  const [proxyUrl, setProxyUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProxyUrl = async () => {
      try {
        const url = await getProxyUrl(imageUrl);
        setProxyUrl(url);
      } catch (error) {
        console.error("Error fetching proxy URL:", error);
      } finally {
        setLoading(false);
      }
    };

    if (imageUrl) {
      fetchProxyUrl();
    }
  }, [imageUrl]);

  return [loading, proxyUrl];
}

async function getProxyUrl(imageUrl: string) {
  if (isImageId(imageUrl)) {
    return await getImageUrl(imageUrl);
  }
  return `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
}

export default DraggableImage;
