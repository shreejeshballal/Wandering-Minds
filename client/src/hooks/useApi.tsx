/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { awsApi } from "@/lib/apiUtil";
import { useState } from "react";
import { toast } from "sonner";

const useApi = () => {
  const [apiLoading, setApiLoading] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const makeRequest = async (
    method: string,
    url: string,
    data?: any,
    type: string = "normal"
  ) => {
    try {
      setApiLoading(true);
      const response =
        type === "normal"
          ? await api({
              method,
              url,
              data,
            })
          : await awsApi({ method, url, data });

      console.log(response.data);
      setApiData(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response.data.message || error.message);
    } finally {
      setApiLoading(false);
    }
  };

  const uploadImageToS3 = async (file: any) => {
    try {
      const { uploadURL } = await makeRequest("get", "/get-upload-url");
      if (uploadURL) {
        await makeRequest("put", uploadURL, file, "aws");
      }
      return uploadURL.split("?")[0];
    } catch (error: any) {
      toast.error(error?.response.data.message || error.message);
    }
  };

  return { makeRequest, apiLoading, apiData, uploadImageToS3 };
};

export default useApi;
