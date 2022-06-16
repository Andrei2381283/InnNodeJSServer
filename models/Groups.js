const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const Groups = sequelize.define("groups", {
    group: DataTypes.STRING,
    task: {
        type: DataTypes.BLOB("long"),
        get() {
            return this.getDataValue('task') ? JSON.parse(this.getDataValue('task').toString()) : {};
        },
        set(val) {
           this.setDataValue('task', Buffer.from(JSON.stringify(val)));
        }
    },
    name: DataTypes.STRING
})

module.exports = Groups;