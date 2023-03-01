const pluginWebc = require('@11ty/eleventy-plugin-webc')
const browserslist = require('browserslist')
const css = require('lightningcss')

let targets = css.browserslistToTargets(browserslist('>= 0.25%'))

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc)
  eleventyConfig.addPassthroughCopy('src/img')

  eleventyConfig.addTemplateFormats('css')
  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: (inputContent, inputPath) => {
      return () => {
        let result = css.bundle({
          filename: inputPath,
          minify: true,
        })
        return result.code
      }
    },
  })

  return {
    dir: {
      input: 'src',
      addPassthroughCopy: true,
    },
  }
}
