/**
 * Plugin for å kopiere FHI-angularkomponenter til dist mappen. Dette for å vise implementasjonen for html og ts filene.
 * Plugin ble laget da denne fungerer for ng serve (webpack-devserver) også.
*/
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/app/library-angular-dynamic/default-examples/angular-components", to: "angular-components"},
                { from: "src/assets", to: "assets"}
            ]
        }),
    ]
}
