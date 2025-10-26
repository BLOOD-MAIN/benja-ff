import { auth, db, storage } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const loginSection = document.getElementById('login-section');
const adminPanel = document.getElementById('admin-panel');
const loginBtn = document.getElementById('loginBtn');

loginBtn.onclick = () => {
  const email = document.getElementById('adminEmail').value;
  const pass = document.getElementById('adminPass').value;
  signInWithEmailAndPassword(auth, email, pass)
    .then(userCredential => {
      loginSection.style.display='none';
      adminPanel.style.display='block';
      loadAccounts();
      loadGemStore();
      loadBanners();
      loadComments();
    })
    .catch(err => alert(err.message));
};

// Accounts CRUD
async function loadAccounts() {
  const accountsSnapshot = await getDocs(collection(db, 'accounts'));
  const accountsList = document.getElementById('accountsList');
  accountsList.innerHTML = '';
  accountsSnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `<strong>${data.title}</strong> - $${data.price} <button onclick='deleteAccount("${docSnap.id}")'>Delete</button>`;
    accountsList.appendChild(div);
  });
}
window.deleteAccount = async (id) => {
  await deleteDoc(doc(db, 'accounts', id));
  loadAccounts();
};

// Gem Store CRUD
async function loadGemStore() {
  const gemSnapshot = await getDocs(collection(db, 'gemStore'));
  const gemList = document.getElementById('gemList');
  gemList.innerHTML='';
  gemSnapshot.forEach(docSnap=>{
    const data = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML=`<strong>${data.packName}</strong> - ${data.gemsCount} gems - $${data.price} <button onclick='deleteGem("${docSnap.id}")'>Delete</button>`;
    gemList.appendChild(div);
  });
}
window.deleteGem = async (id) => {
  await deleteDoc(doc(db,'gemStore',id));
  loadGemStore();
};

// Banners CRUD
async function loadBanners() {
  const bannerSnapshot = await getDocs(collection(db,'events'));
  const bannerList = document.getElementById('bannerList');
  bannerList.innerHTML='';
  bannerSnapshot.forEach(docSnap=>{
    const data = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML=`<img src='${data.url}' width='200'><button onclick='deleteBanner("${docSnap.id}")'>Delete</button>`;
    bannerList.appendChild(div);
  });
}
window.deleteBanner = async (id)=>{
  await deleteDoc(doc(db,'events',id));
  loadBanners();
};

document.getElementById('uploadBannerBtn').onclick = async ()=>{
  const fileInput = document.getElementById('bannerUpload');
  if(fileInput.files.length===0) return alert('Select file');
  const file = fileInput.files[0];
  const storageRef = ref(storage, `banner-images/${Date.now()}-${file.name}`);
  const snap = await uploadBytes(storageRef,file);
  const url = await getDownloadURL(snap.ref);
  await addDoc(collection(db,'events'),{url});
  loadBanners();
};

// Comments CRUD
async function loadComments(){
  const commentSnapshot = await getDocs(collection(db,'comments'));
  const commentList = document.getElementById('commentList');
  commentList.innerHTML='';
  commentSnapshot.forEach(docSnap=>{
    const data = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML=`<strong>${data.name}</strong>: ${data.text} <button onclick='deleteComment("${docSnap.id}")'>Delete</button>`;
    commentList.appendChild(div);
  });
}
window.deleteComment = async (id)=>{
  await deleteDoc(doc(db,'comments',id));
  loadComments();
};