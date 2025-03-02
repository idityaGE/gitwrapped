const isCommonJS = typeof require !== "undefined";

const getImagePath = (path: string) => {
  if (isCommonJS) {
    const pathModule = require("path");
    return pathModule.join(__dirname, "images", path);
  }
  return new URL(`./images/${path}`, import.meta.url).href;
};

export const images = {
  assets: {
    bg3: getImagePath("assets/bg3.png"),
    bg4: getImagePath("assets/bg4.png"),
    black: getImagePath("assets/black.png"),
    frame2: getImagePath("assets/frame2.png"),
    frame2Svg: getImagePath("assets/frame2.svg"),
    frame7: getImagePath("assets/frame7.png"),
    frame7Svg: getImagePath("assets/frame7.svg"),
    frame9Svg: getImagePath("assets/frame9.svg"),
    grad1: getImagePath("assets/grad1.svg"),
    grad11: getImagePath("assets/grad11.svg"),
    grad2: getImagePath("assets/grad2.svg"),
    grad4: getImagePath("assets/grad4.svg"),
    grad5: getImagePath("assets/grad5.svg"),
    grain: getImagePath("assets/grain.svg"),
    user: getImagePath("assets/user.svg"),
  },
  icons: {
    issues: getImagePath("icons/issues.svg"),
    pr: getImagePath("icons/pr.svg"),
  },
};
