export class User {
    userId: string;
    userPassword: string;
    mail: string;
    phoneNumber: string | null;
    userState: boolean;
    roleID: string | null;

    constructor(userId: string, userPassword: string, mail: string, phoneNumber: string, userState: boolean, roleID: string) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.mail = mail;
        this.phoneNumber = phoneNumber;
        this.userState = userState;
        this.roleID = roleID;
    }
}