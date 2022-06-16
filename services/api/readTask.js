const GroupsModel = require("../../models/Groups");

module.exports = async (req, res) => {
    const { group } = req.body.data;
    const model = await GroupsModel.findOne({where: { group }});
    res.send({
        command:'read_task',
        data: {
            full_task: model.task
        }
    })
}