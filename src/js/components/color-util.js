export default {
  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  interpolateColor(start, end, percent) {
    let startRgb = this.hexToRgb(start);
    let endRgb = this.hexToRgb(end);
    let difference = {
      r: parseInt(startRgb.r + ((endRgb.r - startRgb.r) * percent), 10),
      g: parseInt(startRgb.g + ((endRgb.g - startRgb.g) * percent), 10),
      b: parseInt(startRgb.b + ((endRgb.b - startRgb.b) * percent), 10),
    };

    return `rgb(${difference.r}, ${difference.g}, ${difference.b})`;
  }
};
