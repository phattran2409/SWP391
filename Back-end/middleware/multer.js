// const multer = require('multer');

// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

// multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage (using disk storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only images are allowed'));
};

// Multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = upload;
