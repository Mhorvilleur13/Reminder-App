import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);

export default dayjs;
