const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const Settings = sequelize.define("settings", {
    group: DataTypes.STRING,
    name_setting: DataTypes.STRING,
    setting: {
        type: DataTypes.BLOB("long"),
        get() {
            return this.getDataValue('setting') ? JSON.parse(this.getDataValue('setting').toString()) : {};
        },
        set(val) {
           this.setDataValue('setting', Buffer.from(JSON.stringify(val)));
        }
    }
})

module.exports = Settings;