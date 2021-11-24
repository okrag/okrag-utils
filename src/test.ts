import * as lib from ".";

(async () => {
  while (true) {
    try {
      const keypair = await lib.generateRsaKeyPair();
      const exportedPublic = await keypair.publicKey.export();
      const exportedPrivate = await keypair.privateKey.export();

      const importedPublic = await lib.importKey(exportedPublic, "public");
      const importedPrivate = await lib.importKey(exportedPrivate, "private");

      console.log("done");
    } catch (e) {
      console.log(e);
      break;
    }
  }
})();
