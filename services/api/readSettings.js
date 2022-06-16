const GroupsModel = require("../../models/Groups");
const SettingsModel = require("../../models/Settings");

module.exports = async (req, res) => {
    const { group } = req.body.data;
    const groupModel = await GroupsModel.findOne({where: { group }});
    if(!groupModel) return res.status(400).send("group is not exists");
    const settingModels = await SettingsModel.findAll({ where: { group } });
    const output = {};
    settingModels.forEach(v => {
        output[v.name_setting] = v.setting;
    })
    res.send({
        command:'read_settings',
        data: {
            group,
            settings: output
        }
    })
}