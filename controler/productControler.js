let { product } = require("../model/productModel")


async function add(req, res) {

    let data = await product.add(req.body)
        .catch((error) => { return { error } })
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal server error1"
        return res.status(500).send({ error })
    }
    return res.send(data)
}

async function update(req, res) {

    let data = await product.update(req.body)
        .catch((error) => { return { error } })
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal server error1"
        return res.status(500).send({ error })
    }
    return res.send(data)
}

async function view(req, res) {

    let data = await product.view(req.body)
        .catch((error) => { return { error } })
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal server error1"

        return res.status(500).send({ error })
    }
    return res.send(data)
}

async function dlt(req, res) {

    let data = await product.dlt(req.body)
        .catch((error) => { return { error } })
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal server error1"
        return res.status(500).send({ error })
    }
    return res.send(data)
}

module.exports = { add, update, view, dlt }