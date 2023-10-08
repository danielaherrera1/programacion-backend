import path from "path";
import { fileURLToPath } from "url";
 
const __filname = fileURLToPath(import.meta.url);
export const dirname = path.dirname(__filname)
