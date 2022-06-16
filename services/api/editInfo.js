const GroupsModel = require("../../models/Groups");
const CompaniesModel = require("../../models/Companies");

const getInfoOfInn = require("../../utils/getInfoOfInn");

module.exports = async (req, res) => {
    const { inn, post_address, contact } = req.body.data;
    const model = await CompaniesModel.findOne({ where: { inn } });
    if(!model) return res.status(400).send("Company with this inn is not exists in database");
    if(post_address) model.post_address = post_address;
    if(contact)if(typeof contact == "object"){
        model.contact = contact;
    } else {
        return res.status(400).send("contact is not JSON");
    }
    await model.save();
    res.send({
        command:'edit_info',
        data: {
            inn
        }
    })
}