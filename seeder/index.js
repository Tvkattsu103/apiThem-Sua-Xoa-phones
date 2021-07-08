const seeder = require('mongoose-seed');

const phones = [

    {
        'model': 'Phone',
        'documents': [
            {
                '_id': '6034c179c7f75d27640b3f06',
                'tendanhba': 'vat',
                'sdt': '0355535433'
            },
            {
                '_id': '6034c179c7f75d27640b3f07',
                'tendanhba': 'hxn',
                'sdt': '0355535436'
            }
        ]
    },
    {
        'model': 'User',
        'documents': [
           {
            'tentaikhoan': '1',
            'matkhau': '1',
            'phone_id': '6034c179c7f75d27640b3f06'
           },
           {
            'tentaikhoan': 'voanhtuan',
            'matkhau': '10032000',
            'phone_id': '6034c179c7f75d27640b3f07'
           }
        ]
    },
]
seeder.connect('mongodb://localhost:27017/traning', function() {
    seeder.loadModels([
        './models/phone.js',
        './models/user.js'
    ]);
    seeder.clearModels(['Phone','User'], function() {

        seeder.populateModels(phones, () => {
            seeder.disconnect()
        })

    })
})