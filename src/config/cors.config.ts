import httpStatus from "http-status";
import { CORSError } from "../errors/cors-error";

const permissionList = ["http://localhost:3000"];

export const corsConfig = {
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, false);
    if (permissionList.includes(origin)) return callback(null, true);
    return callback(
      new CORSError(httpStatus.METHOD_NOT_ALLOWED, "U are impostor")
    );
  },
};