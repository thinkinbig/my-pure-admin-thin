import { http } from "@/utils/http";
import { baseUrlApi, baseUrlApi2 } from "./utils";

interface VerifyResponse {
  success: boolean;
  message: string;
}

export const formFunction = formData => {
  return http
    .request("get", baseUrlApi("verifyToken"))
    .then((res: VerifyResponse) =>
      res.success
        ? http.post(baseUrlApi2("formFunction"), formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            maxBodyLength: Infinity
          })
        : Promise.reject(res.message)
    )
    .catch(err => {
      console.log(err);
      return false;
    });
  // return http.post(baseUrlApi2("formFunction"), formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   },
  //   maxBodyLength: Infinity,
  //   data: formData
  // });
};
