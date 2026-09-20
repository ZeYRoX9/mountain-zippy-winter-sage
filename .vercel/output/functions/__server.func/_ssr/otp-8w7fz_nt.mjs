import { r as createServerFn } from "./ssr.mjs";
import { g as createSsrRpc } from "./router-BBMsO9gN.mjs";
import { t as authMiddleware } from "./middleware-4Vp6Rdy2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/otp-8w7fz_nt.js
var sendVerificationOtp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(createSsrRpc("f88c3f0e4c21defad0c385da00410672a51e8d48623307be5418087825f9a75a"));
var confirmVerificationOtp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("1013f7e8b2d0ff209bd437f411687aa035c63ab2f17e0b9a911c7d6a35365dd4"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("d69c886a58b75fc63739cfcdd08042c2847a52c0355d3c4f726211d2bd8a99e7"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("725387ca5a0c1c35a16a21391ada43b4005032fead455b713c586412a9c90ea5"));
//#endregion
export { sendVerificationOtp as n, confirmVerificationOtp as t };
