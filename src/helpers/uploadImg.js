const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        const nameFormat = `img-${Date.now()}${path.extname(
            file.originalname
        )}`;
        cb(null, nameFormat);
    },
});

const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 2 MB
});

const multiUpload = (req, res, next) => {
    const uploadMultiple = upload.array("photo", 5);
    uploadMultiple(req, res, (err) => {
        if (err) {
            res.status(500).json({
                message:'Multer ERROR',
                details:err
            })
        } else {
            console.log(req.files)
            let filePath = req.files.map((val) => "/images/" + val.filename)

            req.filePath = filePath.join(',')
            next();
        }
    });
};



module.exports = multiUpload;