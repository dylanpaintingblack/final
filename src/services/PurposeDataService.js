import firebase from "../firebase";

const db = firebase.ref("/purposes");

class PurposeDataService {
  getAll() {
    return db;
  }

  create(purpose) {
    return db.push(purpose);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new PurposeDataService();
