import { Paella } from "paella-core";
import getCernCustomPluginsContext from "./index";

const initParams = {
  customPluginContext: [getCernCustomPluginsContext()],
};

let paella = new Paella("player-container", initParams);

paella
  .loadManifest()
  .then(() => console.log("done"))
  .catch((e) => console.error(e));
