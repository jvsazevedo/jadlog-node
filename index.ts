import { RequestHandler } from "./src/utils/factory/requestHandler";
import { JadlogHandler } from "./src/lib/jadlog";

export const JadlogNode = (token: string) => new JadlogHandler(new RequestHandler({ token }));
