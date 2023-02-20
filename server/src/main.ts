import { App } from "./http/Server";

async function main() {
  const Server: number = 3333;
  App().listen(Server, () =>
    console.log(`Server is running on port ${Server}`)
  );
}
