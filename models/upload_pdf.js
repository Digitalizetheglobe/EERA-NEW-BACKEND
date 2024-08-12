module.exports = (sequelize, DataTypes) => {
    const upload_pdf = sequelize.define('upload_pdf', {
      pdf_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pdf_data: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
      },
    });
  
    return upload_pdf;
  };
  