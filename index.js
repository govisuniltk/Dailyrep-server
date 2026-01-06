const express = require('express')
require('dotenv').config()
const cors = require('cors')
require('./config/connection')
const router = require('./routes/router')

const dailyRepServer = express()

dailyRepServer.use(cors())

// ✅ Increase body size limit for image upload
dailyRepServer.use(express.json({ limit: '10mb' }))
dailyRepServer.use(express.urlencoded({ extended: true, limit: '10mb' }))

dailyRepServer.use('/api', router)

const PORT = process.env.PORT || 3000

dailyRepServer.listen(PORT, () => {
    console.log(`dailyrep server running at port ${PORT}`)
})

dailyRepServer.get('/', (req, res) => {
    res.status(200).send('DailyRep server is running')
})
