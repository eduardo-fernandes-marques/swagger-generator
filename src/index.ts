import { config } from "#/config/constants";
import "#/config/swagger"; /** Here is where the swagger-autgen runs **/

import app from "#/app";

(async () => {
  try {
    app().listen(config.serverPort, () => {
      console.info(
        "\x1b[33m%s\x1b[0m",
        `=> ⚡️🚀[server]: Server is running at http://localhost:${config.serverPort}`
      );
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
