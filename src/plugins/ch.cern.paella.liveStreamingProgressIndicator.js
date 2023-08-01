import { ProgressIndicatorPlugin } from "paella-core";

function draw(context, width, height) {
  console.log("draw params", {
    context,
    width,
    height,
  });
  let posX = 0;
  let textMargin = 0;
  const circleSize = 8;

  if (this.side === "left") {
    posX = this.margin;
    textMargin = circleSize + 4;
  } else if (this.side === "center") {
    posX = width / 2;
    textMargin = 0;
  } else if (this.side === "right") {
    posX = width - this.margin;
    textMargin = -(circleSize + 4);
  }

  const circleMargin = this.side === "center" ? -40 : 0;
  context.fillStyle = this.textColor;
  context.font = `bold 14px Arial`;
  context.textAlign = this.side;
  const textHeight = height / 2 + 3;

  context.fillText("Live", posX + textMargin, textHeight);

  context.beginPath();
  context.fillStyle = this.circleColor;
  context.arc(
    posX + circleMargin,
    height / 2,
    circleSize / 2,
    0,
    2 * Math.PI,
    false
  );
  context.fill();
}

function minHeight() {
  return 25;
}

function minHeightHover() {
  return 25;
}

export default class LiveStreamingProgressIndicatorPlugin extends ProgressIndicatorPlugin {
  async isEnabled() {
    const e = await super.isEnabled();
    console.log("isEnabled1", e);
    console.log("player", this.player);
    console.log("isEnabled2", this.player.videoContainer.isLiveStream);
    return true;
    return e && this.player.videoContainer.isLiveStream;
  }

  async load() {
    this.layer = this.config.layer ?? "foreground";
    this.side = this.config.side ?? "right";
    this.margin = this.config.margin ?? 50;
    this.textColor = this.config.textColor ?? "white";
    this.circleColor = this.config.circleColor ?? "red";

    if (["foreground", "background"].indexOf(this.layer) === -1) {
      throw new Error(
        "Invalid layer set in plugin 'es.upv.paella.liveStreamingPlugin'. Valid values are 'foreground' or 'background'"
      );
    }

    if (["left", "center", "right"].indexOf(this.side) === -1) {
      throw new Error(
        "Invalid side set in plugin 'es.upv.paella.liveStreamingPlugin'. Valid values are 'left', 'center' or 'right'"
      );
    }

    console.log("load params", {
      layer: this.layer,
      side: this.side,
      margin: this.margin,
      textColor: this.textColor,
      circleColor: this.circleColor,
    });
  }

  drawForeground(context, width, height, isHover) {
    if (this.layer === "foreground") {
      draw.apply(this, [context, width, height, isHover]);
    }
  }

  drawBackground(context, width, height, isHover) {
    if (this.layer === "background") {
      draw.apply(this, [context, width, height, isHover]);
    }
  }

  get minHeight() {
    return minHeight.apply(this);
  }

  get minHeightHover() {
    return minHeightHover.apply(this);
  }
}
