const fs = require('fs');
const { join, extname, basename } = require('path');


module.exports = function(directoryPath, app) {
    // console.log('',directoryPath)

    function setRoutes(directoryPath, parent = '') {
        fs.readdirSync(directoryPath, { withFileTypes: true }).forEach(entry => {
            // console.log(entry)
            const full  = join(directoryPath, entry.name);
            // console.log(full)
            if(entry.isDirectory()) {
                setRoutes(full, join(parent, entry.name))
            }else if (extname(entry.name) === '.js') {
                const router = require(full);
                const routePath = `/${join(parent, basename(entry.name, '.js'))}`
                const expressRoute = routePath === '/_' ? '/' : routePath.replace('/index', '')

                console.log('line 20,,,,,,,,,,,,',expressRoute)
                console.log(router)
                app.use(expressRoute, router)
            }
        })
    }

    setRoutes(directoryPath)
}