export class UserProgram {
    userProgramId: number;
    userId: string;
    fullName: string;
    programId: string;
    programName: string;
    isLike: boolean;
    alarmTime: string;
    alarmDate: Date | null;
    qrcodePath: string;
    quantity: number;
    accessToken: string;

    constructor(userProgramId: number, userId: string, programId: string,
        isLike: boolean, alarmTime: string, alarmDate: Date,
        qrcodePath: string, accessToken: string,
        fullName: string, programName: string, quantity: number
    ) {
        this.userProgramId = userProgramId;
        this.userId = userId;
        this.programId = programId;
        this.isLike = isLike;
        this.alarmTime = alarmTime;
        this.programId = programId;
        this.alarmDate = alarmDate;
        this.qrcodePath = qrcodePath;
        this.accessToken = accessToken;
        this.fullName = fullName;
        this.programName = programName;
        this.quantity = quantity;
    }
}