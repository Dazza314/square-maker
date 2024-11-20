import { IMAGE_STORE_NAME } from "./constants";
import { deleteBlob, openDatabase, retrieveBlob, storeBlob } from "./db";

export async function storeImage(id: string, file: File) {
  try {
    const db = await openDatabase();
    await storeBlob(db, IMAGE_STORE_NAME, id, file);
  } catch (e) {
    console.error("Error", e);
  }
}

export async function deleteImage(id: string) {
  try {
    const db = await openDatabase();
    await deleteBlob(db, IMAGE_STORE_NAME, id);
  } catch (e) {
    console.error("Error", e);
  }
}

export async function getImageUrl(id: string) {
  try {
    const db = await openDatabase();
    return await retrieveBlob(db, IMAGE_STORE_NAME, id);
  } catch (e) {
    console.error("Error", e);
    return null;
  }
}
