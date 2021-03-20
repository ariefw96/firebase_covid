const authModel = require('./../models/authModel')

module.exports = {
    signup: (req, res) => {
        const { body } = req
        authModel.authSignup(body)
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    message: 'Succesfully Created :))'
                })
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    login: (req, res) => {
        const { body } = req
        let login = []
        authModel.authLogin(body)
            .then((result) => {
                result.forEach((data) => {
                    const id = data.id
                    const hasil = {
                        ...data.data(),
                        id
                    }
                    login.push(hasil)
                })
                if (login.length > 0) {
                    res.status(200).json({
                        status: 200,
                        message: 'sukses Login :))',
                        content: {
                            user_id: login[0].id,
                            phone: login[0].phone,
                            user_type: login[0].user_type
                        }
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'Indetifier Wrong !'
                    })
                }
            }).catch((error) => {
                res.status(500).json(error)
            })
    }
}