const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const Companies = sequelize.define("companies", {
    inn: DataTypes.BIGINT,
    info: {
        type: DataTypes.BLOB("long"),
        get() {
            return this.getDataValue('info') ? JSON.parse(this.getDataValue('info').toString()) : {};
        },
        set(val) {
           this.setDataValue('info', Buffer.from(JSON.stringify(val)));
        }
    },
    post_address: DataTypes.STRING,
    contact: {
        type: DataTypes.BLOB("long"),
        get() {
            return this.getDataValue('contact') ? JSON.parse(this.getDataValue('contact').toString()) : {};
        },
        set(val) {
           this.setDataValue('contact', Buffer.from(JSON.stringify(val)));
        }
    }
})

module.exports = Companies;