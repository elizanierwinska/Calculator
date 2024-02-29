/**
 * @jest-environment jsdom
 */

const {trimTheResult, calculate} = require('../index.js')

describe("testing trimTheResult()", () => {
  test("Returns the given result if it does not exceed the min/max number and max length costraints", () => {
    expect(trimTheResult(123.45)).toBe(123.45)
  })
  test("Throws an error when the last char is a decimal point", () => {
    expect(trimTheResult("123454565443.")).toBe("Error")
  })
  test("Throws an error when the number is greater than the max number allowed", () => {
    expect(trimTheResult("999999999999")).toBe("Error")
  })
  test("Throws an error if the negative number exceeds the displayed num length", () => {
    expect(trimTheResult("-99999999999999")).toBe("Error")
  })
  test("Trim the result if the result is smaller than the max allowed but longer than the max displayed number length", () => {
    expect(trimTheResult("14325436.898786757657668")).toBe(14325436.8987)
  })
  test("Trim the result if the result is smaller than the max allowed but longer than the max displayed number length ", () => {
    expect(trimTheResult("-14325436.898786757657668")).toBe(-14325436.898)
  })
})

describe("Testing calculate()", () => {
  test("Add numbers correctly", () => {
    expect(calculate("8", "add", "7")).toBe(15)
  })
  test("Add numbers with decimal point correctly", () => {
    expect(calculate("155.9", "add", "2767")).toBe(2922.9)
  })
  test("Add negatives number with decimal point correctly", () => {
    expect(calculate("-2435", "add", "-42667.8")).toBe(-45102.8)
  })
  test("Subtract numbers correctly", () => {
    expect(calculate("9923462", "subtract", "7542456")).toBe(2381006)
  })
  test("Subtract negative numbers correctly", () => {
    expect(calculate("-2435", "subtract", "-42667")).toBe(40232)
  })
  test("Subtract numbers with decimal point correctly", () => {
    expect(calculate("17.9", "subtract", "8.5")).toBe(9.4)
  })
  test("Multiply numbers correctly", () => {
    expect(calculate("776", "multiply", "59")).toBe(45784)
  })
  test("Multiply numbers with decimal points correctly", () => {
    expect(calculate("4.5", "multiply", "67.9")).toBe(305.55)
  })
  test("Multiply negative numbers correctly", () => {
    expect(calculate("-11", "multiply", "-93")).toBe(1023)
  })
  test("Multiply one negative and one positive number  correctly", () => {
    expect(calculate("-26", "multiply", "19.5")).toBe(-507)
  })
  test("Divide numbers correctly", () => {
    expect(calculate("1000", "divide", "50")).toBe(20)
  })
  test("Division by 0 results in Infinity output", () => {
    expect(calculate("10", "divide", "0")).toBe(Infinity)
  })
  test("Divide numbers with decimal points correctly", () => {
    expect(calculate("32455.55", "divide", "234235.24")).toBe(0.13855963773)
  })
  test("Divide negative numbers correctly", () => {
    expect(calculate("-32145", "divide", "-1245")).toBe(25.8192771084)
  })
  test("Divide negative with a positive number correctly", () => {
    expect(calculate("-2356", "divide", "25")).toBe(-94.24)
  })
})
