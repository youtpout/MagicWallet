import { Magic } from "@magic-sdk/react-native-expo";
import { API_KEY } from '@env';

console.log("api key", API_KEY);

export const magic = new Magic(API_KEY, {
    network: {
        rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
        chainId: 80001
    }
}); // ✨