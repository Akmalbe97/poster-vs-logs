const express = require("express")
const cors = require("cors")
const connectDB = require("./db/config.db")
const cookieParser = require("cookie-parser")
const announcemetRouter = require("./router/announcement.routes")
const authRouter = require("./router/auth.routes")
const logger = require("./service/logger")
const logRouter = require("./router/log.routes")


const app = express()

app.use(express.json())
app.use(cors({origin: true, credentials: true}))
app.use(cookieParser())

const PORT = process.env.PORT || 3999

connectDB()
/////////////////////////////////// logger
logger.error("talaba tizzimga kirdi")
logger.warn("talaba tizzimga kirdi")
logger.info("talaba tizzimga kirdi")
logger.debug("talaba tizzimga kirdi")

////////////////////////// Router
app.use(announcemetRouter)
app.use(authRouter)
app.use(logRouter)

app.listen(PORT, () => {
  console.log("Port is running on the " + PORT + " port");
})