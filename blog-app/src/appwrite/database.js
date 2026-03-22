import config from "../config/config"
import {Client, ID, Databases, Storage, Query} from "appwrite"

// we can create seperate service for Storage as well

export class DatabaseService {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setProject(config.appwriteProjectID) // we called it here bcz it will not be created until a instance is created.
                .setEndpoint(config.appwriteURL);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, content, featuredImage, status, userId}){//slug as arg

        try {
            const result = await this.databases.createDocument({
                databaseId: config.appwriteDatabaseID,
                collectionId: config.appwriteCollectionID,
                documentId: ID.unique(), //or slug can be this as well
                data: {
                    title, content, featuredImage, userId, status
                }
            });
            return result;
        } catch (error) {
            console.log("Error in create post: ", error)
        }
    }   

    async updatePost(postId, {title, content, featuredImage, status}){

        try {
            const result = await this.databases.updateDocument({
                databaseId: config.appwriteDatabaseID,
                collectionId: config.appwriteCollectionID,
                documentId: postId, //or slug whatever we set documentId
                data: {
                    title, content, featuredImage, status //userId not needed as other users can not access this post
                }
            });
            return result;
        } catch (error) {
            console.log("Error in update post: ", error)
        }
    }    

    async deletePost(postId){

        try {
            const result = await this.databases.deleteDocument({
                databaseId: config.appwriteDatabaseID,
                collectionId: config.appwriteCollectionID,
                documentId: postId, //or slug whatever we set documentId
                
            });
            // return result;// return the deleted document
            console.log("Post has been deleted: ", result)
            return true;// return true/false

        } catch (error) {
            console.log("Error in delete post: ", error)
            return false
        }
    }    

    async getPost(postId){

        try {
            const result = await this.databases.getDocument({
                databaseId: config.appwriteDatabaseID,
                collectionId: config.appwriteCollectionID,
                documentId: postId, //or slug whatever we set documentId
                // queries: [], // optional
                
            });
            return result;
        } catch (error) {
            console.log("Error in get post: ", error)
            return null
        }
    }    

    async getAllPost(queries=[]){
        if (queries.length === 0){
            queries = [
                Query.equal('status', 'active') // get all posts that are active
            ]
        }
        try {
            const result = await this.databases.getDocument({
                databaseId: config.appwriteDatabaseID,
                collectionId: config.appwriteCollectionID,
                queries: queries, // optional
                
            });
            return result;
        } catch (error) {
            console.log("Error in get post: ", error)
            return null;
        }
    }   
    
    

    // Storge Service 
    // file upload service
    async uploadFile(file){
        try {
            const result = await this.bucket.createFile({
                bucketId: config.appwriteBucketID,
                fileId: ID.unique(),
                file: file, // document.getElementById('uploader').files[0],
                // permissions: [Permission.read(Role.any())] // optional
            });
            return result
        } catch (error) {
            console.log("Error in file upload: ", error)
        }
    }

    async deleteFile(fileId){
        try {
            const result = await this.bucket.deleteFile({
                bucketId: config.appwriteBucketID,
                fileId: fileId,
            });
            return result;
        } catch (error) {
            console.log("Error in file delete: ", error)
        }
    }
    //we can define more functions here
};


const dbService = new DatabaseService();
export default dbService;