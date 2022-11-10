export const fileUpload = async (file) => {
  //   if (!file) throw new Error("file select not exist");
  if (!file) return null;

  const cloudUrl = "https://api.cloudinary.com/v1_1/dsp0v740w/upload";

  const formData = new FormData();

  formData.append("upload_preset", "react-notes");

  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("Imagen no subida");

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    // console.warn(error);
    // throw new Error(error.message);
    return null;
  }
};
