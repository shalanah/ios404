// @ts-nocheck

export const parseMdnData = (data: any) => {
  let parsedData = [];
  for (const [cat, features] of Object.entries(data)) {
    if (
      [
        '__meta',
        'browsers',
        'webextensions',
        'webdriver',
        'http',
        'mathml',
      ].includes(cat)
    )
      continue;

    for (const [key, feature] of Object.entries(features)) {
      if (feature.__compat && feature.__compat.mdn_url) {
        if (
          feature.__compat?.status?.deprecated ||
          feature.__compat?.status?.standard_track === false ||
          feature.__compat?.status?.experimental
        )
          continue;
        const {
          __compat: {
            support: { safari_ios, chrome_android },
          },
        } = feature;
        const chromeSupport = Array.isArray(chrome_android)
          ? chrome_android?.[0]?.version_added
          : chrome_android?.version_added;
        const safariSupport = Array.isArray(safari_ios)
          ? safari_ios?.[0]?.version_added
          : safari_ios?.version_added;
        if (safariSupport || !chromeSupport) continue;
        parsedData.push({ cat, key, feature });
      } else {
        for (const [sub, subFeature] of Object.entries(feature)) {
          if (subFeature.__compat && subFeature.__compat.mdn_url) {
            if (
              subFeature.__compat?.status?.deprecated ||
              subFeature.__compat?.status?.standard_track === false ||
              subFeature.__compat?.status?.experimental
            )
              continue;
            const {
              __compat: {
                support: { safari_ios, chrome_android },
              },
            } = subFeature;
            const chromeSupport = Array.isArray(chrome_android)
              ? chrome_android?.[0]?.version_added
              : chrome_android?.version_added;
            const safariSupport = Array.isArray(safari_ios)
              ? safari_ios?.[0]?.version_added
              : safari_ios?.version_added;
            if (safariSupport || !chromeSupport) continue;
            parsedData.push({ cat, key, sub, subFeature });
          }
        }
      }
    }
  }
  return parsedData;
};
