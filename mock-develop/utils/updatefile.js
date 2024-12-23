const { getFile, writeFile }  = require('./readwrite');

const updatefile = async (fileToUpdate) => {
    // console.log(fileToUpdate);
    var method = fileToUpdate.method;
    var errorcode = fileToUpdate.errorcode;
    var delay = fileToUpdate.delay;
    var filePath = fileToUpdate.filePath;
    
    const apiJson = await getFile(filePath);
    const apiObject = JSON.parse(apiJson);
    for (var endPoint in apiObject) {
        apiObject[endPoint][method]['codeResponse'] = errorcode;
        apiObject[endPoint][method]['delay'] = delay;
    }
    await writeFile(filePath, JSON.stringify(apiObject, null, 2));
}

module.exports = updatefile