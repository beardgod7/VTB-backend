const repository = require("./repository");
const { listingSchema, updatelistingSchema } = require("./schema");

/**
 * Creates a new car offering.
 */
async function createCarOffering(req, res, next) {
  try {
    const dealerId = req.userId;
    const offeringPictureUrls = [];

    if (req.files && req.files.pictures) {
      const files = req.files.pictures.slice(0, 5);
      for (const file of files) {
        const offeringPictureUrl = await req.storage.uploadFile(
          file.buffer,
          `car_offering_pictures/${dealerId}-${file.originalname}`
        );
        offeringPictureUrls.push(offeringPictureUrl);
      }
    }

    const offeringData = {
      ...req.body,
      pictures: offeringPictureUrls,
    };

    const validatedData = await listingSchema.validateAsync(offeringData);

    const completeOfferingData = {
      ...validatedData,
    };
    const newOffering = await repository.createlisting(completeOfferingData);
    return res.status(200).json({
      message: "Car offering created successfully",
      offering: newOffering,
    });
  } catch (err) {
    console.log(err);
    console.error("Error in createCarOffering:", err);
    next(err);
  }
}

/**
 * Updates a car offering.
 */
async function updateCarOffering(req, res, next) {
  try {
    const { listingId } = req.params;
    const offeringPictureUrls = [];

    if (req.files && req.files.pictures) {
      const files = req.files.pictures.slice(0, 5);
      for (const file of files) {
        const offeringPictureUrl = await req.storage.uploadFile(
          file.buffer,
          `car_offering_pictures/${listingId}-${file.originalname}`
        );
        offeringPictureUrls.push(offeringPictureUrl);
      }
    }

    const updateData = {
      ...req.body,
      pictures:
        offeringPictureUrls.length > 0 ? offeringPictureUrls : undefined,
    };

    const validatedData = await updatelistingSchema.validateAsync(updateData);
    const updatedOffering = await repository.updatelisting(
      listingId,
      validatedData
    );
    return res.status(200).json({
      message: "Car offering created successfully",
      offering: updatedOffering,
    });
  } catch (err) {
    console.error("Error in updateCarOffering:", err);
    next(err);
  }
}

async function getOfferingbyid(req, res, next) {
  try {
    const { id } = req.params;
    const offerings = await repository.getlistingById(id);
    res
      .status(200)
      .json({ message: "Offerings retrieved successfully", data: offerings });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getAllOffering(req, res, next) {
  try {
    const offerings = await repository.getAlllisting();
    res
      .status(200)
      .json({ message: "Offerings retrieved successfully", data: offerings });
  } catch (err) {
    next(err);
  }
}

const deleteListingById = async (req, res) => {
  const { id } = req.params;

  try {
    await repository.deletelisting(id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ error: error.message || "Failed to delete listing" });
  }
};

module.exports = {
  createCarOffering,
  updateCarOffering,
  getAllOffering,
  getOfferingbyid,
  deleteListingById,
};
