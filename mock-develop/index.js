const minimist = require('minimist');
const error = require('./utils/error');

module.exports = () => {
    const args = minimist(process.argv.slice(2));

    let cmd = args._[0];

    switch (cmd) {
        case 'mock':
            require('./cmds/mock')(args)
            break;
        default:
            error(`"${cmd}" is not a valid command!`, true)
            break;
    }
}
