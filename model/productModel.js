let joi = require("joi")
let { Product } = require("../schema/productSchema")
const { error } = require("console")

// Create
async function add(params) {
    let verify = await verifyAdd(params).catch((error) => { return { error } })
    if (!verify || (verify && verify.error)) {
        return { error: verify.error, status: 400 }
    }
    let find = await Product.findOne({ where: { id: params.id }, raw: true }).catch((error) => { return { error } })
    if (find || (find && find.error)) {
        return { error: "Product is already created", status: 401 }
    }
    let product = await Product.create(params).catch((error) => { return { error } })
    if (!product || (product && product.error)) {
        return { error: "internal server error", status: 500 }
    }
    return { data: product }
}

//joi validation
async function verifyAdd(params) {
    let schema = joi.object({
        name: joi.string().required(),
        img: joi.string().required(),
        summary: joi.string().required()
    })
    let valid = await schema.validateAsync(params, { abortEarly: false }).catch((error) => { return { error } })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}

//Read
async function view(params) {
    let verify = await verifyView(params).catch((error) => { return { error } })
    if (!verify || (verify && verify.error)) {
        return { error: verify.error, status: 400 }
    }
    let check = await Product.findOne({ where: { id: params.id } }).catch((error) => { return { error } })
    if (!check || (check && check.error)) {
        return { error: "Product not found", status: 400 }
    }
    return { data: check }
}

//joi validation
async function verifyView(params) {
    let schema = joi.object({
        id: joi.number().required()
    })
    let valid = await schema.validateAsync(params, { abortEarly: false }).catch((error) => { return { error } })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.errror.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}


// Update

async function update(id, params) {
    let verify = await verifyUpdate(params).catch((error) => { return { error } })
    if (!verify || (verify && verify.error)) {
        return { error: verify.error.details, status: 400 }
    }
    let check = await Product.findOne({ where: { id: id } }).catch((error) => { return { error } })
    if (!check || (check && check.error)) {
        return { error: "Product not found", status: 400 }
    }
    let product = await Product.update({ where: { id: params.id } }).catch((error) => { return { error } })
    if (!product || (product && product.error)) {
        return { error: "Product not updated", status: 500 }
    }
    return { data: product }
}


//joi validation 
async function verifyUpdate(params) {
    let schema = joi.object({
        id: joi.number().required(),

        img: joi.string().allow(""),
        summary: joi.string().allow("")
    })
    let valid = await schema.validateAsync(params, { abortEarly: false }).catch((error) => { return { error } })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}

// delete
async function dlt(params) {
    let verify = await verifyDlt(params).catch((error) => { return { error } })
    if (!verify || (verify && verify)) {
        return { error: verify.error.details, status: 400 }
    }
    let check = await Product.findOne({ where: { id: params.id } }).catch((error) => { return { error } })
    if (!check || (check && check.error)) {
        return { error: "Product not found", status: 500 }
    }
    let delet = (await Product.destroy({ where: { id: params.id } })).catch((error) => { return { error } })
    if (!delet || (delet && delet.error)) {
        return { error: "Internal server error", status: 500 }
    }
    return { data: delet }
}


// joi validation
async function verifyDlt(params) {
    let schema = joi.object({
        id: joi.number().required()
    })
    let valid = await schema.validateAsync(params, { abortEarly: false }).catch((error) => { return { error } })
    if (!valid || (valid && valid.error)) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}

module.exports = { add, view, update, dlt }