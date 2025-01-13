import config from "../config/config";
import { Client, Databases, ID, Query } from "appwrite";

class StorageService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //   services to create update and delete the posts.

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await Databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return true;
    } catch (err) {
      console.log("error in creating post", err);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      await Databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return true;
    } catch (error) {
      console.log("error in updating post", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await Databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error in deleting post", error);
      return false;
    }
  }

  async getOnePost(slug) {
    try {
      await Databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        [Query.equal("status", "active")]
      );
      return true;
    } catch (error) {
      console.log("error in getting one post", error);
      return false;
    }
  }

  async getAllPosts() {
    try {
      await Databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId
      );
      return true;
    } catch (error) {
      console.log("error in getting all posts", error);
      return false;
    }
  }

  //   services to create the file and delete the file

  async uploadFile(file) {
    try {
      await Databases.createFile(config.appwriteBucketId, ID.unique(), file);
      return true;
    } catch (error) {
      console.log("error in creating file", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await Databases.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("error in deleting file", error);
      return false;
    }
  }
}

export const storageService = new storageService();
