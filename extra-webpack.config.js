var webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                PROD_AZURE_AD: JSON.stringify(process.env.PROD_AZURE_AD),
                PROD_FIREBASE: JSON.stringify(process.env.PROD_FIREBASE),
                PROD_ACCESS_REPORT: JSON.stringify(process.env.PROD_ACCESS_REPORT)
            }
        })
    ]
}