const Data = require('../Models/data')

exports.getData = async(req, res) => {
    try {
        console.log("--inside--")
        const response = await Data.find()
        console.log("Reponse---", response)
        res.status(200).json({
            success: true,
            data: response,
            message: 'Data fetched successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            data: 'Internal Server Error',
            message: 'In catch block'
        })
        console.error(err)
    }

}