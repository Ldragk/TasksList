import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ["query"],
    });
  }

  async enableShutdownHooks(app: any) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
