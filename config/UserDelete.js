const dayjs = require("dayjs");
const UserModel = require("../src/models/UserModel");

const userModel = new UserModel();

class UserDelete {
  async verifyUsers() {
    console.log('verificando usuários expirados');

    const users = await userModel.userModel.find();
    const expiryDate = dayjs().subtract(24, "hour"); // Define a data limite para 1 dia atrás

    for (const user of users) {

      if (dayjs(user.created_at).isBefore(expiryDate)) {
        const deletedUser = await userModel.delete(String(user._id));

        console.log(`${deletedUser.username} conta expirou e foi excluída.`);
      }
    }
  }

  async init() {
    await this.verifyUsers();
    setInterval(this.verifyUsers.bind(this), 60 * 60 * 1000); // Verifica se há usuários expirados a cada hora
  }
}

module.exports = new UserDelete();
