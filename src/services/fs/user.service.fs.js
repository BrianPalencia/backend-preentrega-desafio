export default class Users {
    constructor() {
        this.data = [];
    }

    get = async () => {
        return await this.data;
    };

    create = async (newUser) => {
        this.data.push(newUser);
        return newUser;
    };

    modify = async (id, user) => {
        const userIndex = this.data.findIndex((curruser) => curruser.id === id);
        this.data.slice(userIndex, 1, user);
        return user;
    };

    delete = async (id) => {
        const userIndex = this.data.findIndex((curruser) => curruser.id === id);
        const Temporaluser = this.data[userIndex];
        this.data.slice(userIndex, 1);
        return Temporaluser;
    };
}