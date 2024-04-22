module.exports = function (webpackEnv) {
    // ...
    return {
     // ...
      resolve: {
        // ...
        fallback: {
          // 👇️ add this 👇️
          "tls": false,
          "net": false,
        }
      }
    }
  }