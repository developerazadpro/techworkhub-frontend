import { capitalize, formatDate } from "../string";

describe("utils/string.js", () => {
    describe("capitalize", () => {
        test("capitalizes the first letter of a string", () => {
            expect(capitalize("hello")).toBe("Hello");
        });

        test("returns empty string for empty input", () => {
            expect(capitalize("")).toBe("");
        });

        test("handles single character strings", () => {
            expect(capitalize("a")).toBe("A");
        });
    });

    describe("formatDate", () => {
        test("formats valid date strings", () => {
            const date = "2026-02-09T00:00:00Z";
            expect(formatDate(date)).toBe(new Date(date).toLocaleDateString());
        });

        test("returns 'N/A' for null or undefined", () => {
            expect(formatDate(null)).toBe("N/A");
            expect(formatDate(undefined)).toBe("N/A");
        });
    });
});