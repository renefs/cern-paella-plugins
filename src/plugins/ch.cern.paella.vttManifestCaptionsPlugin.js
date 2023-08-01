import { CaptionsPlugin, utils, WebVTTParser } from "paella-core";

export default class VttManifestCaptionsPlugin extends CaptionsPlugin {
  async isEnabled() {
    const enabled = await super.isEnabled();
    return (
      enabled &&
      this.player.videoManifest.captions &&
      this.player.videoManifest.captions.length > 0
    );
  }

  async getCaptions() {
    const result = [];
    const p = [];
    this.player.videoManifest.captions.forEach((captions) => {
      p.push(
        new Promise((resolve) => {
          if (/vtt/i.test(captions.format)) {
            const fileUrl = utils.resolveResourcePath(
              this.player,
              captions.url,
            );
            fetch(fileUrl, { credentials: "include" })
              // eslint-disable-next-line consistent-return
              .then((fetchResult) => {
                if (fetchResult.ok) {
                  return fetchResult.text();
                }
                // reject();
                console.error(fetchResult);
              })
              .then((text) => {
                const parser = new WebVTTParser(text);
                parser.captions.label = captions.text;
                parser.captions.language = captions.lang;
                result.push(parser.captions);
                resolve();
              });
          }
        }),
      );
    });
    await Promise.all(p);
    return result;
  }
}
