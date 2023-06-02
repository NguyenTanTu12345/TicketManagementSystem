export class ResetPassword {
    mail: string;
    resetPasswordToken: string;
    timeSend: Date | string;

    constructor(mail: string, resetPasswordToken: string, timeSend: Date) {
        this.mail = mail;
        this.resetPasswordToken = resetPasswordToken;
        this.timeSend = timeSend;
    }
}