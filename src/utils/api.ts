import { cookies } from "next/headers";
import IResponse from "../interfaces/request.interface";
import { checkContentType } from "./checkContentType";
export interface IApiRequest {
  path: string;
  method: string;
  contentType?: string;
  secure: boolean;
  body: any;
  stringifyBody: boolean;
  accept: string;
}

export const api = async (options: IApiRequest): Promise<Response> => {
  let { path, secure, method, body, stringifyBody, contentType, accept } =
    options;

  const response: IResponse = {
    status: 200,
    access_token: "",
    data: "",
    statusText: "",
    error: [],
  };

  let token = null;

  const API_HOST = process.env.API_HOST || null;
  if (!API_HOST)
    return new Response(
      JSON.stringify({
        ...response,
        status: 500,
        statusText: "api host is empty",
      })
    );

  if (secure) {
    const cookie = cookies();
    token = cookie.get("token")?.value || null;
    if (!token)
      return new Response(
        JSON.stringify({ ...response, status: 401, statusText: "no access" })
      );
  }

  const apiUrl = `${API_HOST}${path}`;

  const headers = {
    "Content-Type": contentType || "application/json",
    Authorization: `Bearer ${token}`,
    Accept: accept || "application/json",
  };
  if (!secure) {
    headers.Authorization = "";
  }

  if (stringifyBody) {
    body = JSON.stringify(body);
  }

  const option = {
    method,
    headers,
    body: method.match(/get|delete/giu) ? undefined : body,
  };

  const res = await fetch(apiUrl, option);
  const _contentType = checkContentType(res.headers);
  if (!res.ok) {
    const err = (await res?.json())?.message || [];
    response.status = res?.status;
    response.statusText = res?.statusText;
    response.error = err;
    const output = new Response(JSON.stringify(response));
    output.headers.set("content-type", "application/json");
    return output;
  }
  if (_contentType === "text") {
    const text = await res?.text();
    response.access_token = "";
    response.data = text;
    response.error = [];
    const output = new Response(JSON.stringify(response));
    output.headers.set("content-type", "application/json");
    return output;
  }
  if (_contentType === "json") {
    const json = await res?.json();
    response.access_token = json.hasOwnProperty("access_token")
      ? json?.access_token
      : undefined;
    response.data =
      json.hasOwnProperty("data") || json.hasOwnProperty("access_token")
        ? json?.data
        : json || undefined;
    response.error = json.hasOwnProperty("error") ? json?.data?.message : [];
    const output = new Response(JSON.stringify(response));
    output.headers.set("content-type", "application/json");
    return output;
  }
  if (_contentType === "image") {
    return new Response(await res.blob());
  }

  if (_contentType === "audio") {
    return new Response(await res.blob());
  } else {
    return Response.error();
  }
};
