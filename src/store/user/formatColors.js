import colorThemes from "../../colors.json";

export default function formatColors(data) {

  const hasLightColors = data.find((obj) => {
    return "lightColors" in obj;
  });

  const hasDarkColors = data.find((obj) => {
    return "darkColors" in obj;
  });

  if (hasLightColors) {
    const newLightColor = colorThemes.light.find(
      (color) => color.name === hasLightColors.lightColors
    );

    data = [...data, { colors: { light: { ...newLightColor } } }];

    const toDel = data.findIndex((obj) => "lightColors" in obj);

    data.splice(toDel, 1);
  }

  if (hasDarkColors) {
    const newDarkColor = colorThemes.dark.find(
      (color) => color.name === hasDarkColors.darkColors
    );

    if (hasLightColors) {
      const colorIndex = data.findIndex((obj) => "colors" in obj);

      data[colorIndex].colors = {
        ...data[colorIndex].colors,
        dark: { ...newDarkColor },
      };
    } else {
      data = [...data, { colors: { dark: { ...newDarkColor } } }];
    }

    const toDel = data.findIndex((obj) => "darkColors" in obj);

    data.splice(toDel, 1);
  }

  return data;

}