const { Router } = require("express");
const {
  getAllUsers,
  getCurrentUser,
  updateUserRole,
  addBalance,
} = require("../controllers/userController");

const router = Router();

// Example route
router.get("/", getAllUsers);
router.get("/current", getCurrentUser);
router.put("/update/role", updateUserRole);
router.post("/add/balance", addBalance);

module.exports = router;
