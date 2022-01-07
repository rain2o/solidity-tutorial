import { ethers } from "ethers";
import abi from "../utils/Keyboards.json";

const contractAddress = "0x63cB153c2d9B8e0a320D144b21d61E4aBDdBdb80";
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
