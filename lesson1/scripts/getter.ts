import {Address, toNano} from 'ton-core';
import { LessonOne } from '../wrappers/LessonOne';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import {TonClient, WalletContractV4} from "ton";
import {mnemonicToWalletKey} from "ton-crypto";

export async function run(provider: NetworkProvider) {

    const lessonOne = LessonOne.createFromAddress(Address.parse("EQD5ScDWNyBd1OfGUeeQ5sS2UiCCIWzgGiK1felBZNFAiF9t"))

    const openedContract = provider.open(lessonOne);

    const total = await openedContract.getTotal()

    console.log("total - ", total)

}

async function sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms))
}