const Journalist = require('../Models/JournalistModel');
const User = require('../Models/userModel'); // تأكد من استيراد نموذج المستخدم
const multer = require('multer');
const path = require('path');

// تهيئة multer لتخزين الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // إضافة الوقت لاسم الملف لتجنب التكرار
  }
});

const upload = multer({ storage: storage });

// دالة لإنشاء صحفي جديد
exports.createJournalist = async (req, res) => {
  try {
    const { fullName, portfolio, bio } = req.body;
    const userId = req.user.id; // يتم أخذ الـ id من التوكن

    // البحث عن المستخدم باستخدام الـ id لاستخراج البريد الإلكتروني
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const email = user.email; // استخراج البريد الإلكتروني من المستخدم

    const newJournalist = new Journalist({
      userId,
      fullName,
      email, // استخدام البريد الإلكتروني المستخرج
      portfolio,
      bio,
      profileImage: req.file.path, // مسار الصورة التي تم رفعها
    });

    await newJournalist.save();
    res.status(201).json({ message: "Journalist request submitted successfully", journalist: newJournalist });
  } catch (error) {
    res.status(500).json({ message: "Error submitting journalist request", error: error.message });
  }
};

module.exports.upload = upload;