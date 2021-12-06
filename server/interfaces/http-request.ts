import { ParsedQs } from "qs";

export interface ParamsDictionary {
  [key: string]: string;
}

export interface HttpRequest {
  body: any;
  query: ParsedQs;
  params: ParamsDictionary;
  ip: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  cookies: any;
  file: Express.Multer.File;
  files: Record<string, any>;
}
