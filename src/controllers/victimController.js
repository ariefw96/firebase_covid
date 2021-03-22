const victimRouter = require('../routes/victimRouter')
const victimModel = require('./../models/victimModel')

module.exports = {
    addVictim: (req, res) => {
        const date = new Date()
        let { body } = req
        body = {
            ...body,
            photo: req.filePath,
            date_added: date.getTime(),
            date_updated: date.getTime()
        }
        console.log(body)
        victimModel.addVictim(body)
            .then((result) => {
                global.io.emit('admin', `One victim added, name ${body.name} from ${body.location}`)
                res.status(200).json({
                    status: 200,
                    message: 'Victim added.'
                })
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    listAllVictim: (req, res) => {
        let listVictim = []
        victimModel.listAllVictim()
            .then((result) => {
                result.forEach((data) => {
                    const id = data.id
                    const Victim = {
                        id,
                        ...data.data()
                    }
                    listVictim.push(Victim)
                })
                if (listVictim.length > 0) {
                    res.status(200).json({
                        status: 200,
                        message: 'Berhasil mendapatkan data',
                        content: listVictim
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'Data tidak ditemukan',
                        content: []
                    })
                }
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    listVictimUser: (req, res) => {
        const { id } = req.params
        let listVictim = []
        victimModel.listVictim(id)
            .then((result) => {
                result.forEach((data) => {
                    const id = data.id
                    const Victim = {
                        id,
                        ...data.data()
                    }
                    listVictim.push(Victim)
                })
                listVictim = listVictim.sort((a, b) => {
                    return b.date_updated - a.date_updated
                });
                if (listVictim.length > 0) {
                    res.status(200).json({
                        status: 200,
                        message: 'Berhasil mendapatkan data',
                        content: listVictim
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'Data tidak ditemukan',
                        content: []
                    })
                }
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    listVictimByRegion: (req, res) => {
        const { id } = req.params
        let listVictim = []
        victimModel.listVictimByRegion(id)
            .then((result) => {
                result.forEach((data) => {
                    const id = data.id
                    const Victim = {
                        id,
                        ...data.data()
                    }
                    listVictim.push(Victim)
                })
                listVictim = listVictim.sort((a, b) => {
                    return b.date_updated - a.date_updated
                });
                if (listVictim.length > 0) {
                    res.status(200).json({
                        status: 200,
                        message: 'Berhasil mendapatkan data',
                        content: listVictim
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'Data tidak ditemukan',
                        content: []
                    })
                }
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    updateVictim: (req, res) => {
        const date = new Date()
        const { id } = req.params
        let { body } = req
        if (req.filePath != null) {
            body = {
                ...body,
                photo: req.filePath
            }
        }
        body = {
            ...body,
            date_updated: date.getTime()
        }
        victimModel.updateVictim(id, body)
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    message: `Data pada ID = ${id} berhasil diperbaharui`
                })
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    deleteVictim: (req, res) => {
        const { id } = req.params
        victimModel.deleteVictim(id)
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    message: `Data pada ID = ${id} berhasil dihapus.`
                })
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    getSingleVictim: (req, res) => {
        const { id } = req.params
        victimModel.getSingle(id)
            .then((result) => {
                const id = result.id
                const Victim = {
                    id,
                    ...result.data()
                }
                res.status(200).json({
                    status: 200,
                    message: 'Berhasil mendapatkan data',
                    content: Victim
                })
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    countDataByRegion: (req, res) => {
        let listRegion = []
        let dataRegion = []
        let dataCount = []
        victimModel.getRegion()
            .then((result) => {
                result.forEach((data) => {
                    const id = data.id
                    const Region = {
                        id,
                        ...data.data()
                    }
                    listRegion.push(Region)
                })
                listRegion.map(({ region }) => {
                    let countData = []
                    victimModel.listVictimByRegion(region)
                        .then((result) => {
                            result.forEach((data) => {
                                const id = data.id
                                const counter = {
                                    id,
                                    ...data.data()
                                }
                                countData.push(counter)
                            })
                            dataRegion.push(region)
                            dataCount.push(countData.length)
                            if (listRegion.length == dataCount.length) {
                                res.status(200).json({
                                    status: 200,
                                    message: 'Sukses',
                                    content: {
                                        region: dataRegion,
                                        victimCount: dataCount
                                    }
                                })
                            }
                        }).catch((error) => {
                            console.log(error)
                        })
                })
                // console.log('data Region', dataRegion)
                // console.log('count', dataCount)

            }).catch((error) => {
                res.status(500).json(error)
            })
    }
}