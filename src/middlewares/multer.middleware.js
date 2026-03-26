import multer from "multer";
import path from "path";

// storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// dynamic file filter generator
const createFileFilter = (allowedTypes) => {
    return (req, file, cb) => {
        // if no filter → allow all files
        if (!allowedTypes || allowedTypes.length === 0) {
            return cb(null, true);
        }

        const ext = path.extname(file.originalname).toLowerCase();

        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error(`Only ${allowedTypes.join(", ")} files allowed`), false);
        }
    };
};

// main upload factory
export const createUploader = ({ allowedTypes = [], maxSize = 2 } = {}) => {
    return multer({
        storage,
        fileFilter: createFileFilter(allowedTypes),
        limits: {
            fileSize: maxSize * 1024 * 1024 // MB
        }
    });
};