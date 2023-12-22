export const getContrast = (color: string): string => {

    const hexToRgb = (hex: string): number[] => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    };

    const calculateLuminance = (rgb: number[]): number => {
        const [r, g, b] = rgb.map((value) => {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const textColor: number[] = hexToRgb(color);
    const bgColor: number[] = hexToRgb("#FFFFFF");
    const luminanceText: number = calculateLuminance(textColor);
    const luminanceBg: number = calculateLuminance(bgColor);

    const contrast: number = (luminanceText + 0.05) / (luminanceBg + 0.05);

    return contrast > 4.5 ? "#000000" : "#FFFFFF";
}