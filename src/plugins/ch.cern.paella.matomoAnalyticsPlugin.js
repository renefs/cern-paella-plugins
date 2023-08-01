/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-assign */
import { DataPlugin } from "paella-core";

export default class MatomoAnalyticsUserTrackingDataPlugin extends DataPlugin {
  async load() {
    console.log("Loading matomo analytics plugin");
    const { trackingId } = this.config;
    // const domain = this.config.domain || "auto";
    if (trackingId) {
      console.log("Matomo Analytics Enabled");
      const _paq = (window._paq = window._paq || []);
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      // eslint-disable-next-line func-names
      (function () {
        const u = "https://webanalytics.web.cern.ch/";
        _paq.push(["setTrackerUrl", `${u}matomo.php`]);
        _paq.push(["setSiteId", trackingId]);
        const d = document;
        const g = d.createElement("script");
        const s = d.getElementsByTagName("script")[0];
        g.async = true;
        g.src = `${u}matomo.js`;
        s.parentNode.insertBefore(g, s);
      })();
    } else {
      console.log(
        "No Matomo Tracking ID found in config file. Disabling Matomo Analytics",
      );
    }
  }

  async write(context, { id }, data) {
    if (this.config.category === undefined || this.config.category === true) {
      const category = "PaellaPlayer";
      const action = data.event;
      const labelData = {
        videoId: id,
        plugin: data.plugin,
      };

      // try {
      //   // Test if data parameters can be serialized
      //   JSON.stringify(data.params);
      //   labelData.params = data.params;
      // } catch (error) {
      //   console.log(error);
      // }

      const label = JSON.stringify(labelData);
      if (category.length > 0 && action.length > 0) {
        // _paq.push(['trackEvent', 'Contact', 'Email Link Click', 'name@example.com']);
        // eslint-disable-next-line no-undef
        _paq.push(["trackEvent", category, action, label]);
      }
    }
  }
}
