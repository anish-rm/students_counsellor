const User = require('../models/userModel');
const multer = require('multer');


const multerStorage = multer.memoryStorage();


const multerFilter = (req, file, cb) => {
  // to check if uploaded file is image
  // we can also write code for csv file
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(res.status(400).json({
      status: 'fail',
      message: 'Not an image! Please upload only images.',
      }) , false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  try{
    if (!req.file) {
      return next();
    }
    const name = slugify(req.body.name, { lower: true });
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer) //we can use like this becoz we are saving image bufferas memory in multer storage
      .resize(500, 500) // to crop it as square
      .toFormat('jpeg') // to convert it to jpeg
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`); 
    next();
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  
};


const filterObj = (obj, ...allowedFields) => {
    //...allowedFields create an array contining the arg we passed in
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };


exports.getMe = (req, res) => {
    res.status(200).json({
        status:'success',
        user: req.user,
    })
}

exports.updateMe = async (req, res) => {
    try{
        if(req.body.password || req.body.confirmPassword){
            return res.status(400).json({
                status:'fail',
                message: 'This route is not for password updates. Please use /updatePassword.',
            })
        }
        console.log(req.body);
        const filteredBody = filterObj(req.body, 'name', 'email');
        if (req.file) filteredBody.photo = req.file.filename;
        console.log(filteredBody);
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
         });
         res.status(200).json({
            status: 'success',
            data: {
              user: updatedUser,
            },
          });
    } catch(err){
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err,
          });
    }
    

}