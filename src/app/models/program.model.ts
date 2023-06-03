export class Program {
    programId: string;
    programName: string;
    programContent: string;
    programTime: string;
    programTdate: Date | null;
    programFdate: Date | null;
    typeInOff: boolean;
    programPrice: number;
    totalTicket: number;
    programType: boolean;
    locationId: string;
    imagePaths: string;
    accessToken: string;

    constructor(programId: string, programName: string, programContent: string,
        programTime: string, programTdate: Date | null, programFdate: Date | null,
        typeInOff: boolean, programPrice: number, totalTicket: number,
        programType: boolean, locationId: string, imagePaths: string,
        accessToken: string) {
        this.programId = programId;
        this.programName = programName;
        this.programContent = programContent;
        this.programTime = programTime;
        this.programTdate = programTdate;
        this.programFdate = programFdate;
        this.typeInOff = typeInOff;
        this.programPrice = programPrice;
        this.totalTicket = totalTicket;
        this.programType = programType;
        this.programContent = programContent;
        this.locationId = locationId;
        this.imagePaths = imagePaths;
        this.accessToken = accessToken;
    }
}