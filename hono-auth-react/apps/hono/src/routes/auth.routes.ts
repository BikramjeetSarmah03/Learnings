import { createRouter } from "@/lib/create-app";

import { auth } from "@/lib/auth";

const router = createRouter();

router.get("/auth/*", (c) => auth.handler(c.req.raw));
router.post("/auth/*", (c) => auth.handler(c.req.raw));

export default router;
