const postcssNormalize = require('postcss-normalize');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
module.exports = {
    // parser: 'sugarss',
    plugins: [
        postcssImport(),
        postcssPresetEnv(),
        cssnano(),
        postcssNormalize()
    ]
}