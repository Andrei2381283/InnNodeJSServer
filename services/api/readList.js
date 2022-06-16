const GroupsModel = require("../../models/Groups");

module.exports = async (req, res) => {
    const models = await GroupsModel.findAll();
    res.send({
        command:'read_list',	
        data: {
            list: models.map(v => v.group)
        }
    })
}