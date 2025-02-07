import { addMinutes, isAfter } from "date-fns";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useQueryParams } from "../../components/shared/QuerySearch";
import { authorize } from "../../server/assets";

type TokenProps = {
    setToken: Dispatch<SetStateAction<string>>
    token: string;
}

export const PreloadTokenCheck = ({ setToken, token }: TokenProps) => {
  const query = useQueryParams();

    useEffect(() => {
        const retrieveToken = localStorage.getItem("spo-xt");
        const tokenExpiration = localStorage.getItem("spo-dt");
        const expired = isAfter(new Date(), new Date(tokenExpiration || ""));
        if (retrieveToken && tokenExpiration && !expired) {
          setToken(retrieveToken);
        }
        if (retrieveToken && tokenExpiration && expired) {
          localStorage.removeItem("spo-xt");
          localStorage.removeItem("spo-dt");
          setToken("");
        }
        if (query.length && query[0]?.code && !token && !retrieveToken && !tokenExpiration) {
          (async () => {
            const data = await authorize({
              provider: "Spotify",
              providerData: { code: query[0].code },
            });
            localStorage.setItem("spo-xt", data.accessToken);
            localStorage.setItem("spo-dt", addMinutes(new Date(), 55).toISOString())
            setToken(data.accessToken);
          })();
        }
      }, [query, token, setToken]);
}