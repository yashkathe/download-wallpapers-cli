const bash = require('shelljs');
const fs = require('fs');

//setup default options for settings json
exports.setSettings0 = () => {

    //create downloads folder
    if(!fs.existsSync('./downloads')) {
        fs.mkdirSync('./downloads');
    }

    //create settings.json
    const option = {
        selfEdit: false
    };
    const jsonFile = JSON.stringify(option);
    fs.writeFileSync('./settings.json', jsonFile);
    fs.writeFile('./settings.json', jsonFile, function cb(err, data) {
        if(err) {
            console.log(err);
        }
    });
};

//optional changes to stop when selfEdit is true 
exports.setSettings1 = () => {
    fs.readFile('./settings.json', (error, data) => {
        if(error) {
            console.log(error);
            return;
        }
        const parsedData = JSON.parse(data);
        if(parsedData.selfEdit === false) {
            parsedData.wallpaperPath = `${bash.pwd().stdout}/downloads`;
            fs.writeFile('./settings.json', JSON.stringify(parsedData, null, 2), (err) => {
                if(err) {
                    console.log('Failed to write updated data to file');
                    return;
                }
            });
        }
    });
};