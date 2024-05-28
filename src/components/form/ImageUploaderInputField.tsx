import { convertBase64 } from "@/lib/utils";
import { ChangeEvent } from "react";

type ImageUploaderFieldProps = {
  imageURL: string;
  setImageURLs: (imageURL: string) => void;
};

const ImageUploaderInputField = ({
  imageURL,
  setImageURLs,
}: ImageUploaderFieldProps) => {
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const newImageURLs = (await convertBase64(file)) as string;
      setImageURLs(newImageURLs as string);
    }
  };

  return (
    <div className="flex gap-2">
      <label
        className="w-32 h-40 relative border cursor-pointer group border-gray-300 flex justify-center items-center rounded-md"
        style={{
          backgroundColor: imageURL ? "transparent" : "white",
          backgroundImage: imageURL ? `url("${imageURL}")` : "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ opacity: 0, width: "100%", height: "100%" }}
          className="absolute inset-0 w-full h-full cursor-pointer"
        />
        {!imageURL && (
          <span className="rounded-full px-3 hover:bg-slate-400 text-white py-2 bg-slate-200 absolute z-10 text-sm">
            +
          </span>
        )}
      </label>
    </div>
  );
};

export default ImageUploaderInputField;
