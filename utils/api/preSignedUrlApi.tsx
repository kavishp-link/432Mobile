import { api, handleAxiosError } from ".";

export const presignedUrlApi = async (accessToken: string, fileData: any) => {
  console.log("fileData----->>", fileData);

  try {
    const response = await api.post("v1/aws/presigned-url", fileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("response------->>>", response.status);

    if (response.data.status) {
      return response.data;
    }
  } catch (error) {
    const errorRes = handleAxiosError(error);
    console.error("presignedUrl error", errorRes?.data);
    throw error;
  }
};

export const uploadImageToS3 = async (
  presignedUrl: string,
  key: string,
  selectedAsset: any
) => {
  try {
    const fileObj = {
      fileName: selectedAsset.fileName ?? "image.jpg",
      fileType: selectedAsset.mimeType ?? "image/jpeg",
    };

    const imageBlob = await fetch(selectedAsset.uri).then((res) => res.blob());
    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": fileObj.fileType,
      },
      body: imageBlob,
    });

    if (!uploadRes.ok) {
      throw new Error(`Image upload failed: ${uploadRes.statusText}`);
    }

    const newImageUrl = `https://432collective.s3.us-east-2.amazonaws.com/${key}`;

    return newImageUrl;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};
