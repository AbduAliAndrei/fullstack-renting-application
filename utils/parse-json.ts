import { isNil } from "./type-checkers";

function parseJSONObject(jsonString: any) {
  try {
    const o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (!isNil(o)) {
      return o;
    }
  } catch (e) {
    throw new Error("Not json stringifies");
  }

  return false;
}

export default parseJSONObject;
