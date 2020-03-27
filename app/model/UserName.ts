import IClonable from "./IClonable";

export default class UserName implements IClonable<UserName> {
    family: string;
    given: string[];

    constructor(family: string, given: string[]) {
        this.family = family;
        this.given = given;
    }

    clone(): UserName {
        return new UserName(this.family, this.given);
    }

    getFullName(): string {
        let fullName = '';
        if (this.given && this.given.length > 0) {
            fullName = this.given.join(' ');
        }

        if (this.family && this.family.length > 0) {
            fullName += ' ' + this.family;
        }

        return fullName;
    }

}