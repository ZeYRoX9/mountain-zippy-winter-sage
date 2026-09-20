import { r as createServerFn } from "./ssr.mjs";
import { g as createSsrRpc } from "./router-BBMsO9gN.mjs";
import { t as authMiddleware } from "./middleware-4Vp6Rdy2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DsnfqBP1.js
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a7bfb2735f11df3d6bbf55085ae071faa90bad2cde2fcce815d27570e17c5822"));
var saveMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("3c89b55b7d63ca572d88b96209f2e1dd1f3b1a5e8c64503fe027719a62def4ea"));
var toggleSavedJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("59ce07112c30a59e9b851071ffc399c97a40658651da591e6c4913cdb68890be"));
var listSavedJobs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("aefc5af6024dd9a0fb87b589ffe4ba1e47e4d60fa693ee48d1b897036ac06e25"));
var applyToJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("d1987f319d8d4b0643fd1437e29fcba6e5049aa59c02afbe5ed09f2661bb8739"));
var listMyApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("32e9a8886a1e7f78f292d57f1dbebd43f1512bbdbca50ad2dc17b569357652b9"));
var postEmployerJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("5422d499c2b8abfc4f1a410afc75a931bbc6570d4e8699509d55615ada2c0057"));
var listEmployerJobs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("634c643a74e9277de0d3ee647513f5dd7b87ca9577cbb0157b454b6f4318926a"));
var listEmployerApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("18d220de59c8cfa124a792fe7856359431e3f692cf268d66fad92a6a0e06fade"));
var setApplicationStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("68713cc2079a0c86362e221abe1664c52c0b46b2220a795ef8055d6d9d565429"));
var closeEmployerJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("cab0fb06c1e58bf0e8df75fea076dbced484b21e4d673003b47cbc06d4933cd3"));
//#endregion
export { listEmployerJobs as a, postEmployerJob as c, toggleSavedJob as d, listEmployerApplications as i, saveMyProfile as l, closeEmployerJob as n, listMyApplications as o, getMyProfile as r, listSavedJobs as s, applyToJob as t, setApplicationStatus as u };
