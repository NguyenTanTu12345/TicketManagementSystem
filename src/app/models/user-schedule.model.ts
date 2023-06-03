import { ListProgram } from "./list-program.model";
import { Program } from "./program.model";

export class UserSchedule {
    programId: string;
    programName: string;
    userId: string;
    fullName: string;
    userScheduleTime: string;
    userScheduleDate: Date | null;
    listProgram1: ListProgram[];
    listProgram2: Program[];
    accessToken: string;

    constructor(programId: string, programName: string, userId: string,
        fullName: string, userScheduleTime: string, userScheduleDate: Date,
        listProgram1: ListProgram[], listProgram2: Program[], accessToken: string) {
        this.programId = programId;
        this.programName = programName;
        this.userId = userId;
        this.fullName = fullName;
        this.userScheduleTime = userScheduleTime;
        this.userScheduleDate = userScheduleDate;
        this.listProgram1 = listProgram1;
        this.listProgram2 = listProgram2;
        this.accessToken = accessToken;
    }
}