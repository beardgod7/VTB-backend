const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../authentication/model");
const { verification } = require("../onboarding/model");

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, freezeTableName: true }
);

const TruckOwner = sequelize.define(
  "TruckOwner",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    truckownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergencyContact: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    accountDetails: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyRegistrationNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fleetSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    operatingRegions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    supportingDocuments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "TruckOwner",
    timestamps: true,
  }
);

const DriverProfile = sequelize.define(
  "DriverProfile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    truckownerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    emergencyContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refereeContacts: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    supportingDocuments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("employed", "unemployed"),
      allowNull: false,
      defaultValue: "unemployed",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "DriverProfile",
    timestamps: true,
  }
);

// User and UserProfile relationship
User.hasOne(UserProfile, { foreignKey: "userId", onDelete: "CASCADE" });
UserProfile.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
// User and UserProfile relationship
User.hasOne(TruckOwner, { foreignKey: "userId", onDelete: "CASCADE" });
TruckOwner.belongsTo(User, { foreignKey: "truckownerId", onDelete: "CASCADE" });

// User and UserProfile relationship
User.hasOne(DriverProfile, { foreignKey: "userId", onDelete: "CASCADE" });
DriverProfile.belongsTo(User, {
  foreignKey: "driverId",
  onDelete: "CASCADE",
});
// ✅ User → verification (Onboarding)
User.hasOne(verification, {
  foreignKey: "userId",
  as: "verification",
});
verification.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
module.exports = {
  UserProfile,
  TruckOwner,
  DriverProfile,
};
