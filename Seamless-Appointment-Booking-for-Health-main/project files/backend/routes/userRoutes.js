const express = require("express");
const multer = require("multer");
const {
  registerController,
  loginController,
  authController,
  docController,
  getAllDoctorsControllers,
  appointmentController,
  getAllUserAppointments,
  getDocsController,
  getallnotificationController,
  deleteallnotificationController,
  downloadDocController,
} = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Multer setup for file uploads (e.g., images)
const upload = multer({ dest: 'uploads/' });

/**
 * @route   POST /api/user/register
 * @desc    Register a new user
 */
router.post("/register", registerController);

/**
 * @route   POST /api/user/login
 * @desc    Login user
 */
router.post("/login", loginController);

/**
 * @route   POST /api/user/getuserdata
 * @desc    Get user data (requires auth)
 */
router.post("/getuserdata", authMiddleware, authController);

/**
 * @route   POST /api/user/registerdoc
 * @desc    Register doctor (auth required)
 */
router.post("/registerdoc", authMiddleware, docController);

/**
 * @route   GET /api/user/getalldoctorsu
 * @desc    Get all doctors (user view)
 */
router.get("/getalldoctorsu", authMiddleware, getAllDoctorsControllers);

/**
 * @route   POST /api/user/getappointment
 * @desc    Book appointment with image upload
 */
router.post(
  "/getappointment",
  authMiddleware,
  upload.single("image"),
  appointmentController
);

/**
 * @route   POST /api/user/getallnotification
 * @desc    Fetch all notifications
 */
router.post("/getallnotification", authMiddleware, getallnotificationController);

/**
 * @route   POST /api/user/deleteallnotification
 * @desc    Clear all notifications
 */
router.post("/deleteallnotification", authMiddleware, deleteallnotificationController);

/**
 * @route   GET /api/user/getuserappointments
 * @desc    Get user's appointments
 */
router.get("/getuserappointments", authMiddleware, getAllUserAppointments);

/**
 * @route   GET /api/user/getDocsforuser
 * @desc    Get documents available to user
 */
router.get("/getDocsforuser", authMiddleware, getDocsController);

/**
 * @route   GET /api/user/downloadDoc
 * @desc    Download document (if this is implemented)
 */
// router.get("/downloadDoc", authMiddleware, downloadDocController); // Uncomment if used

module.exports = router;
