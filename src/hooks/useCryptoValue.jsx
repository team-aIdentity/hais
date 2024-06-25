import CryptoJS from "crypto-js";

const useCryptoValue = async (data) => {
  try {
    const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;
    const hash = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey)
      .toString()
      .slice(0, 8);
    return hash;
  } catch (e) {
    console.log("CryptoJS >>>>> code: " + e.code + " / message: " + e.message);
  }
};

export default useCryptoValue;
