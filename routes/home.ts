import { Router, Request, Response } from "express";


export const homeRouter: Router = Router();

homeRouter.get("/home", (req: Request, res: Response) => {
     res.send(`hi from houme router`);
});


