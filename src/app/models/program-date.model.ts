export class ProgramDate {
    dateTime: Date | null;
    totalProgram: number;

    constructor(dateTime: Date, totalProgram: number) {
        this.dateTime = dateTime;
        this.totalProgram = totalProgram;
    }
}