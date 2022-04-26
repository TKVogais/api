const multer = require('multer')

module.exports = (
    multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './images')
            },
            filename: function (req, file, cb) {
                let size = file.originalname.length
                if (file.originalname.match(/png/) || file.originalname.match(/jpg/)) {
                    cb(null, "user_" + file.originalname.substring(size - 4, size))
                } else {
                    cb(null, "user_" + file.originalname.substring(size - 5, size))
                }
            }
        }),
        fileFilter: (req, file, cb) => {
            const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
                formatoAceito => formatoAceito == file.mimetype
            );
            if (extensaoImg) {
                return cb(null, true)
            }
            return cb(null, false)
        }
    })
)