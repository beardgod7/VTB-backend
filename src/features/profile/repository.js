const { UserProfile, TruckOwner, DriverProfile } = require("./model");
const { User } = require("../authentication/model");
const { Op, Sequelize } = require("sequelize");

// Create a new user
/**
 * Creates a new user in the database.
 * @param {Object} data - The user data.
 * @returns {Promise<User>} - The newly created user.
 */
async function createUserprofile(data) {
  try {
    const user = await UserProfile.create(data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Creates a new car offering.
 */
async function createtruckowner(offeringData) {
  return await TruckOwner.create(offeringData);
}

/**
 * Creates a new car offering.
 */
async function createdriverprofile(offeringData) {
  return await DriverProfile.create(offeringData);
}

async function updateUserprofile(userId, updates) {
  try {
    const result = await UserProfile.update(updates, {
      where: { userId: userId },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
}

async function updatetruckownerprofile(truckownerId, updates) {
  try {
    const result = await TruckOwner.update(updates, {
      where: { truckownerId: truckownerId },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    console.log("Error updating truck owner:", error);
    throw error;
  }
}

async function updatedriverprofile(driverId, updates) {
  try {
    const result = await DriverProfile.update(updates, {
      where: { driverId: driverId },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    console.log("Error updating driver profile:", error);
    throw error;
  }
}

/**
 * Finds a user profile by userId field, including the associated User model.
 * @param {string} userId - The user's ID.
 * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
 */
async function findUserprofileById(userId) {
  try {
    const userProfile = await UserProfile.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });
    return userProfile || null;
  } catch (error) {
    throw error;
  }
}

/**
 * Finds a user profile by userId field, including the associated User model.
 * @param {string} userId - The user's ID.
 * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
 */
async function findtruckownerprofileById(truckownerId) {
  try {
    const truckProfile = await TruckOwner.findOne({
      where: { truckownerId },
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });
    return truckProfile || null;
  } catch (error) {
    throw error;
  }
}

/**
 * Finds a user profile by userId field, including the associated User model.
 * @param {string} userId - The user's ID.
 * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
 */
async function finddriverrprofileById(driverId) {
  try {
    const driverProfile = await DriverProfile.findOne({
      where: { driverId },
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });
    return driverProfile || null;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  updateUserprofile,
  finddriverrprofileById,
  createUserprofile,
  findUserprofileById,
  createtruckowner,
  findtruckownerprofileById,
  updatetruckownerprofile,
  createdriverprofile,
  updatedriverprofile,
};
