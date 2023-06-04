export class ListProgram {
    programId: string;
    programName: string;
    programImagePath: string;
    typeInOff: boolean;

    constructor(programId: string, programName: string, programImagePath: string,
        typeInOff: boolean) {
        this.programId = programId;
        this.programName = programName;
        this.programImagePath = programImagePath;
        this.typeInOff = typeInOff;
    }
}