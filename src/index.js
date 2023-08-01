export default function getCernCustomPluginsContext() {
  return require.context("./plugins", true, /\.js/);
}
