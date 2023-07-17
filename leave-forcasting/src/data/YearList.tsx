import { KeyValueObject } from "types/KeyValueList";

const startYear = 2020;
const endYear = 2030;
const YearList = Array.from(Array(endYear - startYear + 1).keys(), (num) => ({
  label: `${num + startYear}`,
  value: `${num + startYear}`
})) as ReadonlyArray<KeyValueObject>;

export default YearList;
