import { useLocation } from "react-router-dom";
import { stripOffUrl } from "../../utils/shared";

export function useQueryParams() {
  const { search } = useLocation();

  const urlParams = stripOffUrl(search);
  return urlParams;
}