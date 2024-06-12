import { Request } from "express";
export type yes = Request & {
  addNumbers?: number;
};
