import { useEffect, useRef, useContext } from 'react';
import { formContext } from './create';
const images = []
const UploadWidget = () =>{
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const {setValue} = useContext(formContext)
    useEffect(() =>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "ds4blfuip",
            uploadPreset: "ml_default"
        }, function(error, result){
            if (!error && result && result.event === "success") {
                console.log("Imagen subida exitosamente:", result.info.secure_url);
                images.push(result.info.secure_url)  
                console.log('Estas son las url de las imagenes:', images) 
                setValue('images', images)
            } else {
                console.error("Error al subir la imagen:", error);
            }
        });
        
       
    }, []);

    return (
        <button onClick={() => widgetRef.current.open()}>
            Subir imágenes
        </button> //sdadasd
    );
}

export default UploadWidget;