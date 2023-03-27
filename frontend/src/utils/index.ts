import * as moment from "moment";

export const getDisplayDateTime = (isoDateTime: string): string => {
  return moment(isoDateTime).format("MM/DD/YYYY hh:mm:ss A");
};
