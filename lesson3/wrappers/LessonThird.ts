import {Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode} from 'ton-core';

export type LessonThirdConfig = {
    owner: Address
};

export function lessonThirdConfigToCell(config: LessonThirdConfig): Cell {
    return beginCell().storeAddress(config.owner).endCell();
}

export class LessonThird implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LessonThird(address);
    }

    static createFromConfig(config: LessonThirdConfig, code: Cell, workchain = 0) {
        const data = lessonThirdConfigToCell(config);
        const init = { code, data };
        return new LessonThird(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().endCell(),
        });
    }

    async sendMessage(provider: ContractProvider, via: Sender, value: bigint, msg?: Cell){
        await provider.internal(via, {
            value
        })
    }
}
