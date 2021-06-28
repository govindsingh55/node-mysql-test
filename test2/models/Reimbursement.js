module.exports = (sequelize, DataTypes) => {
  const Reimbursement = sequelize.define("Reimbursement", {
    reimbursementType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otherDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fromPlace: {
      type: DataTypes.STRING,
      allowNull: true
    },
    toPlace: {
      type: DataTypes.STRING,
      allowNull: true
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true
    },
    conveyanceMode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    travelKm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    invoNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },

    fromDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hotelName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Reimbursement
}