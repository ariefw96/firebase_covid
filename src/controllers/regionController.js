const regionModel = require('./../models/regionModel')

module.exports = {

    getAll: (req, res) => {
        let listRegion = []
        regionModel.get()
            .then((result) => {
                result.forEach((data) =>{
                    const id = data.id
                    const region = {
                        id,
                        ...data.data()
                    }
                    listRegion.push(region)
                })
                if(listRegion.length > 0){
                    res.status(200).json({
                        status:200,
                        message:'Berhasil mendapatkan data',
                        content: listRegion
                    })
                }else{
                    res.status(404).json({
                        status:404,
                        message:'Data tidak ditemukan',
                        content: []
                    })
                }
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    addNewRegion: (req, res) =>{
        const {body} = req
        regionModel.add(body)
        .then((result) =>{
            res.status(200).json({
                status:200,
                message:'Sukses menambahkan data'
            })
        }).catch((error) =>{
            res.status(500).json(error)
        })
    }
}