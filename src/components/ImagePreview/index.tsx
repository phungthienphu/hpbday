const ImagePreview = ({ imageName }: { imageName?: string }) => {
  return (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
      <p className="text-gray-400 text-lg font-semibold">{imageName ?? "No image"}</p>
    </div>
  );
};

export default ImagePreview;
