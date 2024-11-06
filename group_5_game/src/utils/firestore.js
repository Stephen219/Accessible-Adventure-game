import { getFirestore } from "@firebase/firestore";

import { app } from "./firebaseConfig";

const db = getFirestore(app);

/**
 * this is the db instance that we will use to interact with the firestore database
 * to import it in any file use the following import statement
 * import { db } from "../utils/firestore";
 */

export { db };    
