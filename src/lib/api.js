export const apiFunc = async (
  url,
  method = "GET",
  body = null,
  successFunc,
  errorFunc,
  setIsLoading = null,
  baseURL = "https://backend-uat.alphacapitalgroup.uk/",
  AdditionalHeader = false
) => {
  setIsLoading && setIsLoading(true);

  console.log("urlurl : ", url);
  try {
    // let payoutBaseURL = `https://payout-forecast.alphacapitalgroup.uk/`;
    // let generalBaseURL = `https://backend-uat.alphacapitalgroup.uk/`;
    const idToken = localStorage.getItem("idtoken");
    const config = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken ? `Bearer ${idToken}` : "",
      },
    };

    if (body && method.toUpperCase() !== "GET") {
      config.body = JSON.stringify(body);
    }

    if (AdditionalHeader) {
      config.headers = {
        ...config.headers,
        "x-api-key": "31589ca36bc44174862bc801f10e0902",
      };
    }

    const response = await fetch(`${baseURL}${url}`, config);
    console.log("Data response: ", response);
    let data;
    if (response.ok) {
      data = await response.json();
      console.log("Data : ", data);
      successFunc?.(data);
    } else {
      errorFunc?.(data);
      console.error("API Error:", data);
    }
  } catch (error) {
    errorFunc?.(error);
    console.error("Request failed:", error);
  }
  setIsLoading && setIsLoading(false);
};
