export class User {
    private id: number;
    private mail: string;
    private password: string;
    private role: number;

    constructor(id: number, mail: string, password: string, role: number) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.role = role;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getMail(): string {
        return this.mail;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): number {
        return this.role;
    }

    // Setters
    public setMail(mail: string): void {
        this.mail = mail;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setRole(role: number): void {
        this.role = role;
    }
}