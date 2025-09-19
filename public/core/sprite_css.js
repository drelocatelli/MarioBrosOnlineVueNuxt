class SpriteCss {

  static mergeCssText(existingCssText, newCssText) {
    const existingStyles = this.parseCssText(existingCssText);
    const newStyles = this.parseCssText(newCssText);
  
    // Mescla as propriedades
    const mergedStyles = { ...existingStyles, ...newStyles };
  
    // Converte o objeto de estilos em uma string de CSS
    const mergedCssText = Object.keys(mergedStyles)
      .map((property) => `${property}:${mergedStyles[property]};`)
      .join("");
  
    return mergedCssText;
  }
  
  static parseCssText(cssText) {
    const styles = {};
  
    cssText.split(";").forEach((style) => {
      const [property, value] = style.split(":");
      if (property && value) {
        styles[property.trim()] = value.trim();
      }
    });
  
    return styles;
}
}