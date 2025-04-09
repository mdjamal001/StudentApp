const palettes = [
  {
    primaryColor: (opacity) => `rgba(8, 145, 178,${opacity})`,
    secondaryColor: (opacity) => `rgba(120, 113, 108,${opacity})`,
  },
  {
    primaryColor: (opacity) => `rgba(15, 150, 115,${opacity})`,
    secondaryColor: (opacity) => `rgba(120, 113, 108,${opacity})`,
  },
  {
    primaryColor: (opacity) => `rgba(81, 69, 225,${opacity})`,
    secondaryColor: (opacity) => `rgba(120, 113, 108,${opacity})`,
  },
];

export const theme = palettes[0];
