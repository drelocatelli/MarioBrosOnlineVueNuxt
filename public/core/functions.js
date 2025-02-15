class Functions {

    static async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static convertCssToJs(css) {
        const cssObj = {};
        const rules = css.split(';').filter(rule => rule.trim() !== '');
      
        rules.forEach(rule => {
          const [property, value] = rule.split(':').map(str => str.trim());
          const jsProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
          if(value != null) {
              cssObj[jsProperty] = value;
          }

        });
      
        return cssObj;
    }

    static convertJsToCss(jsObj) {
        return Object.entries(jsObj).map(([key, value]) => {
            // Convert camelCase to kebab-case
            const cssProperty = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
            return `${cssProperty}: ${value};`;
          }).join('\n');
    }
        
}