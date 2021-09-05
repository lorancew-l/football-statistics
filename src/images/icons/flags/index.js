export default function getFlagIcons() {
  let flags = {};

  const context = require.context("./", false, /\.(png|jpe?g|svg)$/);

  context.keys().forEach((flag) => {
    let flagName = flag.replace("./", "");
    flagName = flagName.replace(".svg", "");
    flagName = flagName.toLowerCase();
    flags[flagName] = context(flag);
  });

  return flags;
}
