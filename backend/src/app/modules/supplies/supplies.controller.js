const Supply = require('./supplies.model')

const resBuilder = require('../../utils/response.builder')
const ErrorBuilder = require('../../utils/error.builder')
const catchAsync = require('../../utils/catch-async')

exports.getAllSupplies = catchAsync(async (_req, res) => {
   const supplies = await Supply.getAllSupplies()
   if (!supplies?.[0]) supplies = []

   res.status(200).json(
      resBuilder(res, 200, 'Supplies retrieved successfully', supplies)
   )
})

exports.getSupplyById = catchAsync(async (req, res) => {
    const supply = await Supply.getSupplyById(req.params.id)

    if (!supply) throw new ErrorBuilder(404, 'Supply not found')
    
    res.status(200).json(
        resBuilder(res, 200, 'Supply retrieved successfully', supply)
    )
})

exports.createSupply = catchAsync(async (req, res) => {
    const supply = await Supply.createSupply(req.body)

    res.status(201).json(
        resBuilder(res, 201, 'Supply created successfully', supply)
    )
})

exports.updateSupply = catchAsync(async (req, res) => {
    const supply = await Supply.updateSupply(req.params.id, req.body)

    if (!supply) throw new ErrorBuilder(404, 'Supply not found')

    res.status(200).json(
        resBuilder(res, 200, 'Supply updated successfully', supply)
    )
})

exports.deleteSupply = catchAsync(async (req, res) => {
    const supply = await Supply.deleteSupply(req.params.id)

    if (!supply) throw new ErrorBuilder(404, 'Supply not found')

    res.status(200).json(
        resBuilder(res, 200, 'Supply deleted successfully', supply)
    )
})