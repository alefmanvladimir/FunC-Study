import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    toNano
} from 'ton-core';

export type LessonFifthConfig = {
    owner: Address
};

export function lessonFifthConfigToCell(config: LessonFifthConfig): Cell {
    return beginCell().storeAddress(config.owner).endCell();
}

export class LessonFifth implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LessonFifth(address);
    }

    static createFromConfig(config: LessonFifthConfig, code: Cell, workchain = 0) {
        const data = lessonFifthConfigToCell(config);
        const init = { code, data };
        return new LessonFifth(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().endCell(),
        });
    }

    async setAddress(provider: ContractProvider, via: Sender, new_addr: Address, queryId: number){
        await provider.internal(via, {
            value: toNano("0"),
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell()
                .storeUint(1, 32)
                .storeUint(queryId, 64)
                .storeAddress(new_addr)
                .endCell(),
        })
    }

    async sendMessage(provider: ContractProvider, via: Sender, queryId: number){
        await provider.internal(via, {
            value: toNano("0"),
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell()
                .storeUint(2, 32)
                .storeUint(queryId, 64)
                .endCell(),
        })
    }

    async sendWrongMessage(provider: ContractProvider, via: Sender){
        await provider.internal(via, {
            value: toNano("0"),
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell()
                .endCell(),
        })
    }
}
