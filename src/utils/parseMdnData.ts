// @ts-nocheck

export const parseMdnData = (data: any) => {
  let parsedData = [];
  for (const [cat, mainFeatures] of Object.entries(data)) {
    for (const [mainFeatureKey, features] of Object.entries(mainFeatures)) {
      if (features.__compat && features.__compat.mdn_url) {
        if (features?.status?.deprecated) continue;
        const {
          __compat: {
            support: { safari_ios, chrome_android },
          },
        } = features;
        const chromeSupport = Array.isArray(chrome_android)
          ? chrome_android?.[0]?.version_added
          : chrome_android?.version_added;
        const safariSupport = Array.isArray(safari_ios)
          ? safari_ios?.[0]?.version_added
          : safari_ios?.version_added;
        if (safariSupport || !chromeSupport) continue;
        parsedData.push({ cat, mainFeatureKey, features });
      } else {
        for (const [featureKey, feature] of Object.entries(features)) {
          if (feature.__compat && feature.__compat.mdn_url) {
            if (feature?.status?.deprecated) continue;
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
            parsedData.push({ cat, mainFeatureKey, feature, featureKey });
          }
        }
      }
    }
  }

  // const parseData = Object.entries(data).reduce(
  //   (acc, [cat, mainFeatures]) => {
  //     return Object.entries(mainFeatures).reduce(
  //       (a, [mainFeatureKey, features]) => {
  //         if (features.__compat && features.__compat.mdn_url) {
  //           const compat = features.__compat;
  //           const status = compat.status;
  //           if (
  //             status?.deprecated ||
  //             compat?.support?.safari_ios?.version_added || // supported in ios
  //             !compat?.support?.chrome_android?.version_added // not supported in chrome android
  //           )
  //             return acc;
  //           return [...acc, { cat, mainFeatureKey, features }];
  //         } else {
  //           return acc;
  //           console.log('there is more');
  //         }
  //       },
  //       []
  //     );
  //   },
  //   []
  // );
  console.log(parsedData);
};
