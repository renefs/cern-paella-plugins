import { ButtonPlugin } from "paella-core";
import defaultBackwardIcon from "./icons/previous-icon.svg";

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

export function toSeconds(timeExpr) {
  const units = { h: 3600, m: 60, s: 1 };
  const regex = /(\d+)([hms])/g;

  let seconds = 0;
  let match = regex.exec(timeExpr);

  while (match) {
    seconds += parseInt(match[1], 10) * units[match[2]];
    match = regex.exec(timeExpr);
  }

  return seconds;
}

export default class PrevTimeButtonPlugin extends ButtonPlugin {
  getAriaLabel() {
    return this.player.translate("Go to previous time");
  }

  getDescription() {
    return this.getAriaLabel();
  }

  async isEnabled() {
    const enabled = (await super.isEnabled()) && params.time;
    if (!enabled) {
      return false;
    }
    this.time = 0;
    this.timeParams = params.time.split(",");
    this.slots = [];
    if (this.timeParams) {
      this.timeParams.forEach((element) => {
        if (/[hms]/.test(element)) {
          this.slots.push(toSeconds(element));
        } else {
          this.slots.push(parseFloat(element));
        }
      });
    }
    this.player.currentPosition = 0;
    // this.goToPosition(this.player.currentPosition);

    return enabled;
  }

  async load() {
    const addSuffix =
      this.config.suffix !== undefined ? this.config.suffix : true;
    this.suffix = addSuffix ? "s" : "";
    this.icon = defaultBackwardIcon;
    setTimeout(() => {
      Array.from(this.iconElement.getElementsByClassName("time-text")).forEach(
        (textIcon) => {
          // eslint-disable-next-line no-param-reassign
          textIcon.innerHTML = this.time + this.suffix;
        }
      );
    }, 100);
  }

  goToPosition(position) {
    if (position < 0) {
      this.player.currentPosition = 0;
    } else {
      this.player.currentPosition = position;
    }
    this.time = this.slots[this.player.currentPosition];
    console.log(
      `Jump to previous time: ${this.time}. Slot ${this.player.currentPosition}`
    );
    this.player.videoContainer.setCurrentTime(this.time);
  }

  async action() {
    this.goToPosition(this.player.currentPosition - 1);
  }
}
