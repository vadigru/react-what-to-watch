import {getTextedRating} from "./common.js";

const testValues = {
  BAD: 1.5,
  NORMAL: 4,
  AWESOME: 10
};

it(`Should test switch statment`, () => {
  expect(getTextedRating(testValues.BAD)).toBe(`Bad`);
  expect(getTextedRating(testValues.NORMAL)).toBe(`Normal`);
  expect(getTextedRating(testValues.AWESOME)).toBe(`Awesome`);
});
