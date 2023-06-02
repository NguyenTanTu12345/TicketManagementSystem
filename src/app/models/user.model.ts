export class User {
    userId: string;
    userPassword: string;
    mail: string;
    phoneNumber: string;
    userState: boolean;
    cccd: string;
    fullName: string;
    dateOfBirth: Date | null;
    roleId: string;
    accessToken: string;

    constructor(userId: string, userPassword: string, mail: string, 
        phoneNumber: string, userState: boolean, cccd: string,
        fullName: string, dateOfBirth: Date, roleId: string, 
        accessToken: string) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.mail = mail;
        this.phoneNumber = phoneNumber;
        this.userState = userState;
        this.cccd = cccd;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.roleId = roleId;
        this.accessToken = accessToken;
    }
}