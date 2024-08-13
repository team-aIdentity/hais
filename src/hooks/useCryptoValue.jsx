import CryptoJS from "crypto-js";

const useCryptoValue = async (data) => {
  try {
    const hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex).slice(0, 8);
    return hash;
  } catch (e) {
    console.log("CryptoJS >>>>> code: " + e.code + " / message: " + e.message);
  }
};

export default useCryptoValue;
