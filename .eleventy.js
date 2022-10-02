const postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

// PostCSS config setup
const postcssPlugins = [
  postcssPresetEnv({
    features: {
      'custom-media-queries': true,
      'has-pseudo-class': true,
      'media-query-ranges': true,
      'nesting-rules': true,
    },
  }),
  cssnano({ preset: 'default' }),
]

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addTemplateFormats('pcss')
  eleventyConfig.addExtension('pcss', {
    outputFileExtension: 'css',
    compile: async (inputContent) => {
      const result = await postcss(postcssPlugins)
        .process(inputContent)
        .then((output) => output)

      return async () => {
        return result.css
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
