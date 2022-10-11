export class Constants {
  public static readonly MultiplierPerBingo = 2;
  public static readonly PointsPerEasyEntry = 1;
  public static readonly PointsPerMediumEntry = 5;
  public static readonly PointsPerHardEntry = 10;
}
const DIFFICULTY = [
  Constants.PointsPerEasyEntry,
  Constants.PointsPerMediumEntry,
  Constants.PointsPerHardEntry,
];
export const indexToPoints = (index: number) => {
  return DIFFICULTY[index] || 0;
};

const TEXT = ["Einfaches Ereignis", "Mittleres Ereignis", "Schweres Ereignis"];
export const indexToText = (index: number) => {
  return TEXT[index] || "";
};
