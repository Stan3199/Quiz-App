import FetchData from "../commonFunctions/FetchData";

export const useVisualData = (requestJSON) => {
    return FetchData(requestJSON, 'FunctionApp/getResponseFromEndpoint').then((res) => res.json());
};
