import { quotes, authors } from "./quotes";
import { isValid } from "./quotesValidation";

it("has valid quotes", () => {
  expect(isValid({ quotes, authors })).toBe(true);
});
