import { render, screen } from "@testing-library/react";
import Collection from "./collection";

let collectionInst;
test("Collection initial values", async () => {
  try {
    collectionInst = new Collection();
    expect(collectionInst.state).toBeInstanceOf(Object);
    expect(collectionInst.state.page).toBe(1);
    expect(collectionInst.state.isLoadingMore).toBe(0);
  } catch (e) {
    console.log("error", e);
  }
});
