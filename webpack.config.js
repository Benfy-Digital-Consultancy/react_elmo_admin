module.exports = {
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint',
          include: paths.appSrc,
        }
      ]
    }
  };