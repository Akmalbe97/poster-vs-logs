const {Router} = require("express")
const { getAnnouncement, addAnnouncement, updateAnnouncement, deleteAnnouncement, getOne, search } = require("../controller/announcement.controller")
const authenticate = require("../middleware/auth.middleware")

const announcemetRouter = Router()

announcemetRouter.get("/get_announcement", getAnnouncement)
announcemetRouter.get("/get_one/:id", getOne)
announcemetRouter.get("/search/:spiker", search)
announcemetRouter.post("/add_announcement", addAnnouncement)
announcemetRouter.put("/update_announcement/:id", updateAnnouncement)
announcemetRouter.delete("/delete_announcement/:id", deleteAnnouncement)

module.exports = announcemetRouter;