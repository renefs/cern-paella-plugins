import { ButtonPlugin } from "paella-core";

export default class TestButtonPlugin extends ButtonPlugin {
  async load() {
    this.title = "Login";
  }

  static get side() {
    return "right"; // or right
  }

  static get parentContainer() {
    return "videoContainer"; // or videoContainer
  }

  static async action() {
    console.log("Test");
  }
}
