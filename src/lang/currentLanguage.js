export const currentLanguage = (lang = "en") => {
  return {
    labels: require(`./${lang}.json`),
    errors: require(`./${lang}-errors.json`),
  };
};
