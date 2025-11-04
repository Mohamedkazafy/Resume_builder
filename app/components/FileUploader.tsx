import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const formatSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
      maxSize: 20 * 1024 * 1024,
      accept: { "application/pdf": [".pdf"] },
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer p-4">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="upload" className=" size-10" />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm max-w-xs text-gray-700 font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Size: **{formatSize(file.size)}**
                  </p>
                </div>
                <p className="text-sm text-blue-500 mt-2">
                  Click to select a different file
                </p>
              </div>
              <button className="p-2 curosr-pointer" onClick={(e)=>{
                onFileSelect?.(null)
              }}>
                <img
                  src="/icons/cross.svg"
                  alt="remove"
                  className="w-4 h-4"
                  />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-sm text-gray-400">PDF (max 20MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
