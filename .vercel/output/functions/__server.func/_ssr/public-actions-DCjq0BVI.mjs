import { r as createServerFn } from "./ssr.mjs";
import { g as createSsrRpc } from "./router-BBMsO9gN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-actions-DCjq0BVI.js
var submitContact = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("58b88a92a667a409679f572e5fc9099aa232c0b716ac67849eaf754d9077517b"));
var submitJobReport = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("83ae4dc933f27891607f5f42254152bf40771d56d8b64e2c80f57f63620faa8b"));
var generateCvAssist = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("a7c4ceef64717a39fcfb3a442c8841e996e0f7774645f0b063cae5b1052dba2c"));
//#endregion
export { submitContact as n, submitJobReport as r, generateCvAssist as t };
