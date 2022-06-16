const GroupsModel = require("../../models/Groups");
const ApiKeysModel = require("../../models/ApiKeys");

module.exports = async (req, res) => {
    const { group } = req.body.data;
    const apiKey = req.body.api_key;
    const [model, created] = await GroupsModel.findOrCreate({where: { group }});
    const apiKeyModel = await ApiKeysModel.findOne({ where: { api_key: apiKey } });
    model.setDataValue("name", apiKeyModel.name);
    await model.save();
    res.send({
        command:'new_group',	
        data: {
            group,
            result: created ? "new" : "edit"
        }
    })
}