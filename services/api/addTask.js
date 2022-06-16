const GroupsModel = require("../../models/Groups");
const CompaniesModel = require("../../models/Companies");

const getInfoOfInn = require("../../utils/getInfoOfInn");

module.exports = async (req, res) => {
    try {
        const { group, task } = req.body.data;
        const model = await GroupsModel.findOne({where: { group }});
        for(const elem1 of task){
            for(const elem2 in elem1){
                const elem = elem1[elem2];
                const model = await CompaniesModel.findOne({ where: { inn: elem.inn } });
                if(model) {
                    const info = {
                        inn: model.inn,
                        info: model.info.address,
                        post_address: model.post_address || "",
                        contact: model.contact || ""
                    }
                    elem1[elem2] = info;
                } else {
                    const info = await getInfoOfInn(elem.inn);
                    await CompaniesModel.create({ inn: elem.inn, info: info })
                    elem1[elem2] = {
                        inn: elem.inn,
                        info: info.address,
                        post_address: "",
                        contact: ""
                    };
                }
            }
        }
        model.task = task;
        await model.save();
        res.send({
            command:'add_task',	
            data: {
                group,
                task,
                result: 'add',
            }
        })
    } catch(err) {
        console.error(err);
        res.send({
            command:'add_task',	
            data: {
                group,
                result: 'err',
            }
        })
    }
}