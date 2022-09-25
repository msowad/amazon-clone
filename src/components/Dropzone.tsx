import { Alert, Card, CardContent, Typography } from "@mui/material";
import NextImage from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  error?: string;
  previousFile?: string;
}

const Dropzone: React.FC<Props> = ({ file, setFile, error, previousFile }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: false,
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFile(file);
      }
    },
  });

  return (
    <>
      <Card {...getRootProps()}>
        <input {...getInputProps()} />
        <CardContent sx={{ textAlign: "center", cursor: "pointer" }}>
          <Typography textAlign="center" paragraph>
            Drag drop some files here, or click to select files
          </Typography>
          {previewUrl && (
            <NextImage
              src={previewUrl}
              width={200}
              height={200}
              objectFit="contain"
              alt="image preview"
            />
          )}
          {!previewUrl && previousFile && (
            <NextImage
              src={previousFile}
              width={200}
              height={200}
              objectFit="contain"
              alt="image preview"
            />
          )}
        </CardContent>
      </Card>
      {fileRejections[0] && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {fileRejections[0].errors[0].message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default Dropzone;
