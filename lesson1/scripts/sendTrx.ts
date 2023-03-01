import {Address, beginCell, toNano} from 'ton-core';
import { LessonOne } from '../wrappers/LessonOne';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import {TonClient, WalletContractV4} from "ton";
import {mnemonicToWalletKey} from "ton-crypto";

export async function run(provider: NetworkProvider) {

    const lessonOne = LessonOne.createFromAddress(Address.parse("EQD5ScDWNyBd1OfGUeeQ5sS2UiCCIWzgGiK1felBZNFAiF9t"))


    const openedContract = provider.open(lessonOne);
    console.log("trx sent ")

    const res = await openedContract.sendTrx(provider.sender(), 10)
    console.log(res)

}

async function sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms))
}