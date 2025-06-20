// archivo: src/lib/multer.ts
import multer from 'multer';
import path from 'path';

// Asegurarnos de que el directorio de subida exista
// Nota: En un entorno sin servidor como Vercel, esto no será persistente.
// Para producción, se recomienda un servicio de almacenamiento como S3 o Cloudinary.
const uploadDir = path.join(process.cwd(), 'public/uploads');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generar un nombre de archivo único para evitar colisiones
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });

export default upload;