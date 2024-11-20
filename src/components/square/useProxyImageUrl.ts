import { useEffect, useState } from "react";
import { getImageUrl } from "../../db/imageStore";
import { isImageId } from "./squareUtils";

export function useProxyImageUrl(
  imageUrl: string,
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
