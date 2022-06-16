const GroupsModel = require("../../models/Groups");
const SettingsModel = require("../../models/Settings");

module.exports = async (req, res) => {
    const { group, name_setting, setting } = req.body.data;
    const groupModel = await GroupsModel.findOne({where: { group }});
    if(!groupModel) return res.status(400).send("group is not exists");
    const [ settingModel, settingModelCreated ] = await SettingsModel.findOrCreate({ where: { group, name_setting } });
    settingModel.setting = {...settingModel.setting, ...setting};
    await settingModel.save();
    res.send({
        command:'write_setting',
        data: {
            group,
            name_setting,
            result: settingModelCreated ? "new" : "edit"
        }
    })
}