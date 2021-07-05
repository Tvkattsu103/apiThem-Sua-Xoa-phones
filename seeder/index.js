const seeder = require('mongoose-seed');

const phones = [

    {
        'model': 'Phone',
        'documents': [
            {
                'tendanhba': 'testvaliddate',
                'sdt': '355535433',
               
            }
        ]
    }, 
]
seeder.connect('mongodb://localhost:27017/traning', function() {
    seeder.loadModels([
        './models/phone.js',
    ]);
    seeder.clearModels(['Phone'], function() {

        seeder.populateModels(phones, () => {
            seeder.disconnect()
        })

    })
})