/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
import { Canvas, CanvasPlugin, createElementWithHtmlText } from "paella-core";
import * as img_url from "./icons/live-icon.png";

// Canvas implementation
export class LiveStreamIndicatorCanvas extends Canvas {
  /**
   * This  class displays an image indicating whether the stream is live or not.
   *
   * @param {*} player
   * @param {*} videoContainer
   * @param {*} stream
   */
  constructor(player, videoContainer, stream) {
    super("div", player, videoContainer);
    this.stream = stream;
    this.parentContainer = videoContainer;
  }

  /**
   * When the plugin is loaded, this code will be executed.
   * It will display the image of the live stream indicator if the stream is live.
   *
   * @param {*} player
   */
  async loadCanvas() {
    let isLiveStream = false;

    const streamSources = this.stream.sources;

    const setStreamAsLive = (key, value) => {
      const tempIsLiveStream = value[0].isLiveStream;
      if (tempIsLiveStream) {
        isLiveStream = tempIsLiveStream;
      }
    };

    Object.keys(streamSources).forEach((key) => {
      setStreamAsLive(key, streamSources[key]);
    });

    if (isLiveStream) {
      const indicator = document.getElementById("live-stream-indicator");
      if (indicator) {
        return;
      }
      console.log("Stream is live. Displaying the live stream indicator");
      createElementWithHtmlText(
        `<div id="live-stream-indicator"><img class="live-image-plugin" src="${img_url.default}"/></div>`,
        this.parentContainer
      );
    }
  }
}

// Canvas plugin definition
export default class LiveStreamIndicatorPlugin extends CanvasPlugin {
  // eslint-disable-next-line class-methods-use-this
  get parentContainer() {
    return "videoContainer"; // or videoContainer
  }

  isCompatible(stream) {
    if (!Array.isArray(stream.canvas) || stream.canvas.length === 0) {
      console.log("No canvas defined in the stream");
      // By default, the default canvas is HTML video canvas
      this.stream = stream;
      return true;
    }

    return super.isCompatible(stream);
  }

  getCanvasInstance(videoContainer) {
    return new LiveStreamIndicatorCanvas(
      this.player,
      videoContainer,
      this.stream
    );
  }
}
