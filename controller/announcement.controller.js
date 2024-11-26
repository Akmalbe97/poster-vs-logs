const announcementSchema = require("../schema/announcement.schema");

const getAnnouncement = async (req, res, next) => {
  try {
    const announcements = await announcementSchema.find();
    res.json(announcements);
  } catch (error) {
    next(error);
  }
};

const addAnnouncement = async (req, res, next) => {
  try {
    const { spiker, tema, location, date } = req.body;
    const userId = req.user?.userId;
    await announcementSchema.create({
      spiker,
      tema,
      location,
      date,
      user_info: userId
    });

    res.json({
      message: "added new announcement",
    });
  } catch (error) {
    next(error);
  }
};

const updateAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { spiker, tema, location, date } = req.body;

    const foundedAnnoun = await announcementSchema.findById(id);

    if (!foundedAnnoun) {
      return res.json({
        message: "announcement not found",
      });
    }

    let result = await announcementSchema.findByIdAndUpdate(
      id,
      {
        spiker,
        tema,
        location,
        date,
      },
      { new: true }
    );

    res.json({
      message: "announcement has been updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedAnnoun = await announcementSchema.findById(id);

    if (!foundedAnnoun) {
      return res.status(404).json({
        message: "announcement not found",
      });
    }

    await announcementSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "announcement deleted!",
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const foundedAnnoun = await announcementSchema.findById(id);

  if (!foundedAnnoun) {
    return res.status(404).json({
      message: "not found",
    });
  }
  res.status(201).json(foundedAnnoun);
};

const search = async (req, res, next) => {
  try {
    const { spiker } = req.query;

    if (!spiker) {
      return res.status(400).json({
        message: "query not found",
      });
    }
    const searchAnnoun = await announcementSchema.find({
      spiker: { $regex: spiker, $options: "i" },
    }).populate("userId", "name, email, phone, image");

    if (!searchAnnoun.length) {
      return res.status(404).json({
        message: "no results",
      });
    }

    res.status(200).json(searchAnnoun);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAnnouncement,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getOne,
  search,
};
