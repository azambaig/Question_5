const db = require('../database/db');
const rp = require('request-promise');
const cheerio = require('cheerio');


const flipkartModel = db.connection.define('flipkart', {
    name: {
        type: db.Sequelize.STRING
    },
    prices: {
        type: db.Sequelize.STRING
    },
    specification: {
        type: db.Sequelize.STRING
    }
},
    {
        tablename: 'flipkart',
        freezeTableName: true
    }
)

flipkartModel.sync({ force: true })
    .then((result) => {
        console.log(' Table created connection successful');
    }).catch((err) => {
        console.error('Unable to connect to database', err);
    });

const scrappingDetails = async (body) => {
    const url = body.url;
    return rp(url)
        .then(async function (html) {
            const $ = cheerio.load(html);
            let scrapDetails = $('._2kSfQ4').map(async function (i, elem) {
                return new Promise(async (resolve, reject) => {
                    let wikiName = {
                        name: $(this).find($('.iUmrbN')).text(),
                        prices: ($(this).find($('.M_qL-C')).text() || $(this).find($('._3o3r66')).text()),
                        specification: $(this).find($('.BXlZdc')).text()
                    }
                    let insertData = await flipkartModel.create(wikiName);
                    resolve(insertData);
                })
            }).get();
            return Promise.all(scrapDetails).then(data => {
                return data;
            })
        })
        .catch(function (err) {
            return err
        })
}

module.exports = {
    scrappingDetails
}


