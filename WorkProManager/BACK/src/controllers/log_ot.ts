import Log_Ot from '../models/log_ot';
import { Request, Response } from 'express';

export const getLogs = async (req: Request, res: Response) => {
    const logs = await Log_Ot.findAll();
    res.json(logs);
};