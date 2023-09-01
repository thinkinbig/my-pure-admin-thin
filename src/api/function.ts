import { http } from "@/utils/http";
import { baseUrlApi, baseUrlApi2 } from "./utils";
import { downloadBlob } from "@/utils/file";

export const formFunction = (formData: FormData, filename: string) => {
  return http
    .get(baseUrlApi("verifyToken"))
    .then(() =>
      http.post(baseUrlApi2("formFunction"), undefined, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        maxBodyLength: Infinity,
        data: formData
      })
    )
    .then((res: Blob) =>
      downloadBlob(
        new Blob([res], { type: "application/vnd.ms-excel" }),
        filename
      )
    );
};
