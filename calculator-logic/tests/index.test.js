/**
 * @jest-environment jsdom
 */

import {trimTheResult} from '../index.js'

test("Throws an error when the last char is a decimal point or if number is greater than the maxNumber", () => {
  expect(trimTheResult('12345456544.')).toBe(error)
})