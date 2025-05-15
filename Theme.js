const palettes = [
  {
    primaryColor: (opacity) => `rgba(8, 145, 178,${opacity})`,
    secondaryColor: (opacity) => `rgba(120, 113, 108,${opacity})`,
    darkSecondaryColor: (opacity) => `rgba(35, 35, 35,${opacity})`,
    lightBackgroundColor: "white",
    darkBackgroundColor: "rgb(15, 15, 15)",
    lightTextColor: "black",
    darkTextColor: "white",
  },
  {
    primaryColor: (opacity) => `rgba(15, 150, 115,${opacity})`,
    lightSecondaryColor: (opacity) => `rgba(120, 113, 108,${opacity})`,
    darkSecondaryColor: (opacity) => `rgba(35, 35, 35,${opacity})`,
    lightBackgroundColor: "white",
    darkBackgroundColor: "rgb(15, 15, 15)",
    lightTextColor: "black",
    darkTextColor: "white",
  },
  {
    primaryColor: (opacity) => `rgba(81, 69, 225,${opacity})`,
    lightSecondaryColor: (opacity) => `rgba(120, 113, 108,${opacity})`,
    darkSecondaryColor: (opacity) => `rgba(35, 35, 35,${opacity})`,
    lightBackgroundColor: "white",
    darkBackgroundColor: "rgb(15, 15, 15)",
    lightTextColor: "black",
    darkTextColor: "white",
  },
];

export const theme = palettes[0];
