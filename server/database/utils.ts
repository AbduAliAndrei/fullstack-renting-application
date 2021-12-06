import FileUploadException from "../exceptions/file-upload.exception";
import firebase from "firebase";
import fs from "fs";

export async function createImagesOnPath(
  st: firebase.storage.Storage,
  path: string,
  images: Express.Multer.File[]
): Promise<Array<string>> {
  global.XMLHttpRequest = require("xhr2");
  const storageRef = st.ref(path);
  return await Promise.all(
    images.map(async (image) => {
      try {
        const blob = fs.readFileSync(image.path);
        const imageSnapshot = await storageRef
          .child(`${image.fieldname}-${image.filename}/`)
          .put(blob, {
            contentType: image.mimetype,
          });
        return await imageSnapshot.ref.getDownloadURL();
      } catch (e) {
        throw new FileUploadException(e);
      }
    })
  );
}
