import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const response = await this.account.createAccount(
        ID.unique(),
        email,
        password,
        name
      );
      if (response) {
        return this.loginUser(email, password);
      } else {
        return response;
      }
    } catch (err) {
      console.error("error in creating account", err);
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      console.error("error in login", err);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.error("error in logout", err);
    }
  }

  async currentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.error("error in getting current user", err);
    }
    return null;
  }
}

export const authService = new AuthService();
