import { CloudUpload } from "@mui/icons-material";
import { Box, Grid2, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { CropperRef, Cropper, type ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';


export default function PhotoUploadWidget() {
    const [files, setFiles] = useState<object & { preview: string; }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file as Blob)
        })))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">Step 1 - Add Photo</Typography>
                <Box {...getRootProps()}
                    sx={{
                        border: 'dashed 3px #eee',
                        borderColor: isDragActive ? 'green' : '#eee',
                        borderRadius: '5px',
                        paddingTop: '30px',
                        textAlign: 'center',
                        height: '280px'
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload sx={{ fontSize: 80 }} />
                    <Typography variant="h5">Drop image here</Typography>
                </Box>
            </Grid2>
            <Grid2 size={4}>
                <Typography variant="overline" color="secondary">Step 2 - Resize image</Typography>
                {files[0]?.preview &&
                    <Cropper
                        src={files[0]?.preview}
                        style={{ height: 300, width: '90%' }}
                        initialAspectRatio={1}
                        aspectRatio={1}
                        preview='.img-preview'
                        guides={false}
                        viewMode={1}
                        background={false}
                    />}
            </Grid2>
            <Grid2 size={4}>
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">Step 3 - Preview & upload</Typography>
                        <div 
                            className="img-preview"
                            style={{width: 300, height: 300, overflow: 'hidden'}}
                        />
                    </>
                )}
            </Grid2>
        </Grid2>
    )
}