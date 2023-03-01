import {beginCell, toNano} from 'ton-core';
import { LessonOne } from '../wrappers/LessonOne';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import {TonClient, WalletContractV4} from "ton";
import {mnemonicToWalletKey} from "ton-crypto";

export async function run(provider: NetworkProvider) {

    const lessonOne = LessonOne.createFromConfig({initState: 200000}, await compile('LessonOne'));

    await provider.deploy(
        lessonOne,
        toNano('0.1'),
        beginCell().storeUint(10, 32).endCell()
);

    const openedContract = provider.open(lessonOne);

    console.log("contract address - " + lessonOne.address.toString())

}

async function sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms))
}