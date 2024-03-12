/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/apiUtil";
import { useState } from "react";
import { toast } from "sonner";

const useApi = () => {
  const [apiLoading, setApiLoading] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const makeRequest = async (method: string, url: string, data?: any) => {
    try {
      setApiLoading(true);
      const response = await api({
        method,
        url,
        data,
      });

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

  return { makeRequest, apiLoading, apiData };
};

export default useApi;
