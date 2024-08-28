const path = require("path");
module.exports = {
  webpack: {
    alias: {
       "@newComponents": path.join(path.resolve(__dirname, "./src/new-components")),
       "@typography": path.join(path.resolve(__dirname, "./src/new-components/typography")),
       "@customTypes": path.join(path.resolve(__dirname, "./src/types")),
       "@icons": path.join(path.resolve(__dirname, "./src/assets/icons")),
       "@images": path.join(path.resolve(__dirname, "./src/assets/img")),
       "@styles": path.join(path.resolve(__dirname, "./src/scss")),
       "@services": path.join(path.resolve(__dirname, "./src/services")),
     },
  },
};