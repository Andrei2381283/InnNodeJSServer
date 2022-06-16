const axios = require("axios").default;

const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
const token = "204edbf3512158dda25c80a17936b2d44bb20b03";

axios.defaults.headers.common['Authorization'] = "Token " + token;

module.exports = async (inn) => {
    const result = (await axios.post(url, {query: inn}))?.data;
    const data = result?.suggestions ? result?.suggestions[0].data : {};
    const output = {
        name_company: data?.name.short_with_opf || data?.name.short || data?.name.full || "",
        postal_code: data?.address.data.postal_code || "",
        address: data?.address.value || data?.address.unrestricted_value || data?.address.data.source || ""
    }
    return output;
}