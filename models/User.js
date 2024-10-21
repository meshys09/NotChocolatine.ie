export class User {
    constructor(id, mail, password, role) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.role = role;
    }
    // Getters
    getId() {
        return this.id;
    }
    getMail() {
        return this.mail;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    // Setters
    setMail(mail) {
        this.mail = mail;
    }
    setPassword(password) {
        this.password = password;
    }
    setRole(role) {
        this.role = role;
    }
}
