import * as express from "express";
import { dateUtil } from "typed_package_example";
import { EventInfo } from "untyped_package_example";

import { homeRouter } from "./routes/home";
import { MeetupUtil } from "./utils/meetup-util";



const PORT = process.env.PORT || 3000;
const API = "/api/";

const app: express.Express = express();
const handler: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("request came");
    next();
};

app.use(API, handler);
app.use(API, homeRouter);

const meetup: MeetupUtil = new MeetupUtil();
console.log(dateUtil.now());
console.log(meetup.getLibName("some_lib"));


const newInfo: EventInfo = Object.freeze<EventInfo>({
    name: "BrestJS-2",
    date: "2017-06-18 19:00"
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
