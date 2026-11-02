import { describe, expect, it } from "vitest";
import { toFormData } from "@/lib/to-form-data";

describe("toFormData", () => {
  it("skips empty strings and undefined", () => {
    const fd = toFormData({
      a: "1",
      b: "",
      c: undefined,
      d: new File(["x"], "f.pdf"),
    });
    expect([...fd.keys()]).toEqual(["a", "d"]);
  });
});
