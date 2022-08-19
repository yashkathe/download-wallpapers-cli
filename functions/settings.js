const bash = require('shelljs');
const fs = require('fs');

//create a new settings.json file for every user
exports.createSettingsJson = () => {
    const settingsExits = bash.test('-f', 'settings.json');
    if(settingsExits === false) {
        bash.touch("settings.json");
    }
};

//setup default options for settings json
exports.setSettings0 = () => {
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
            parsedData.wallpaperPath = `${bash.pwd().stdout}/wallpapers`;
            fs.writeFile('./settings.json', JSON.stringify(parsedData, null, 2), (err) => {
                if(err) {
                    console.log('Failed to write updated data to file');
                    return;
                }
            });
        }
    });
};
