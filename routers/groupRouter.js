const router = require("express").Router();
const groupCtrl = require("../controllers/groupCtrl");
const auth = require("../middleware/auth");

router.post("/groups", auth, groupCtrl.createGroup);
router.get(`/groups`, auth, groupCtrl.getGroup);
router.patch("/group/:id", auth, groupCtrl.updateGroup);
// router.patch(`/group/:id/maZoom`, groupCtrl.joinMaZoom);

module.exports = router;
