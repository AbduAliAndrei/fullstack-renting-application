import { isString } from "../../utils/type-checkers";
import FileUploadException from "../exceptions/file-upload.exception";
import firebase from "firebase";

export async function createImagesOnPath(
  st: firebase.storage.Storage,
  path: string,
  images: (Blob | string)[]
): Promise<Array<string>> {
  const storageRef = st.ref(path);
  return await Promise.all(
    images.map(async (image) => {
      if (isString(image)) {
        throw new FileUploadException(
          `File was not uploaded to offers storage. Excepted Blob type from ${image}, got ${typeof image}.`
        );
      }

      try {
        const imageSnapshot = await storageRef.put(image);
        return await imageSnapshot.ref.getDownloadURL();
      } catch (e) {
        throw new FileUploadException(e);
      }
    })
  );
}
