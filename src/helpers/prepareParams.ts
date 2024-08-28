type ParamValue = string | number | boolean | Date;

const prepareParams = (baseUrl: string, paramsObj: Record<string, ParamValue | ParamValue[]>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(paramsObj).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((val) => searchParams.append(key, val.toString()));
        } else {
            searchParams.append(key, value.toString());
        }
    });

    return `${baseUrl}?${searchParams.toString()}`
}

export default prepareParams;