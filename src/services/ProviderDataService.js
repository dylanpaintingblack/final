import firebase from "../firebase";

const db = firebase.ref("/providers");

class ProviderDataService {
  getAll() {
    return db;
  }

  create(provider) {
    return db.push(provider);
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

export default new ProviderDataService();
