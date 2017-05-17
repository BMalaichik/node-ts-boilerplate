import * as moment from "moment";


export class DateUtil {
    public now(): Date {
        return moment().utc().toDate();
    }
}

export const dateUtil: DateUtil = new DateUtil();
