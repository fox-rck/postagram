import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import utils from "./utils";

test("get parameter", () => {
  let param = utils.getParameterByName("test", "http://some.com?test=abc");
  expect(param).toBe("abc");
});

test("get random", () => {
  let param1 = utils.getRandom(),
    param2 = utils.getRandom();
  expect(param1).not.toEqual(param2);
});

test("matches", () => {
  let param1 = { id: 1 },
    param2 = { id: 2 };

  let match = utils.matches(param1, param2);
  expect(match).toBe(false);

  param2.id = 1;
  match = utils.matches(param1, param2);
  expect(match).toBe(true);
});
