import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

import {db} from "../firebase/firebaseConfig";

const blogCollection = collection(db,'blogs')

export async function addBlog(
    title:string,
    content:string,
    authorId:string,
    authorEmail:string
){
    const blogData ={
        title,content,authorId,authorEmail, createdAt:serverTimestamp(), updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(blogCollection,blogData)

    return docRef.id;
}

export async function getBlogs(){
    const q = query(
        blogCollection,
        orderBy("createdAt","desc")
    )
    const data = await getDocs(q)

    return data.docs.map((document)=>({
        id: document.id,
        ...document.data()
    }));
};


export async function getBlogById(id:string){
    const blogRef = doc(
        db,'blogs',id
    )

    const snapShot= await getDoc(blogRef)

    if(!snapShot.exists()){
        return null;
    }
    return {
        id: snapShot.id,
        ...snapShot.data()
    }
}


export async function updateBlog(
    id:string,
    title:string,
    content:string
){
    const blogRef = doc(
        db,'blogs',id
    )

    await updateDoc(
        blogRef,{
            title,content,updatedAt:serverTimestamp()
        }
    )
}

export async function deleteBlog(id:string){
    const blogRef = doc(
        db,'blogs',id
    );

    await deleteDoc(blogRef);
}