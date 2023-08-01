# Cern Paella Plugins

[![Build and push to NPM](https://github.com/cern-vc/cern-paella-plugins/actions/workflows/build.yml/badge.svg)](https://github.com/cern-vc/cern-paella-plugins/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/cern-paella-plugins.svg)](https://badge.fury.io/js/cern-paella-plugins)

This repository contains the plugins for the Paella Player used at CERN.

## Available plugins

- ch.cern.paella.liveStreamIndicatorPlugin
- ch.cern.paella.liveStreamingProgressIndicator
- ch.cern.paella.matomoAnalyticsPlugin
- ch.cern.paella.matomoAnalyticsUserTrackingPlugin
- ch.cern.paella.nextTimeButtonPlugin
- ch.cern.paella.prevTimeButtonPlugin
- ch.cern.paella.vttManifestCaptionsPlugin
- ch.cern.paella.testButton

## How to use

To use the plugins, you need to add the following lines to your `config.json` file:

```json
{
  "plugins": {
    "ch.cern.paella.pluginName": {
      "enabled": true,
      "OTHER_CONFIG": "OTHER_CONFIG_VALUE"
    }
  }
}
```

To load the plugins in the Paella Player, you need to add the import :

```javascript
import getCernCustomPluginsContext from "cern-paella-plugins";
```

And then, you need to add the following line to the init parameters of the Paella Player:

```javascript
const initParams = {
    ...,
    customPluginContext: [
        getCernCustomPluginsContext(),
        ...
    ],
};
```

## How to develop

To develop the plugins, you need to clone the repository and install the dependencies:

```bash
$ git clone https://github.com/cern-vc/cern-paella-plugins.git
$ cd cern-paella-plugins
$ npm install
```

To build the plugins, you need to run the following command:

```bash
$ npm run build
```

To test the plugins, you need to run the following command:

```bash
$ npm run dev
```

Go to `http://localhost:8090/?id=test-video` to test the plugins.

---

You will need to modify the `config/config.json` file to add the plugins you want to test, and the `repository_test/repository/test-video/data.json` file to modify the video you want to test.
