import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    Slice,
    toNano
} from 'ton-core';

export type LessonSeventhConfig = {

};

export function lessonSeventhConfigToCell(config: LessonSeventhConfig): Cell {
    return beginCell().endCell();
}

export class LessonSeventh implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LessonSeventh(address);
    }

    static createFromConfig(config: LessonSeventhConfig, code: Cell, workchain = 0) {
        const data = lessonSeventhConfigToCell(config);
        const init = { code, data };
        return new LessonSeventh(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
        });
    }

    async sendAdd(provider: ContractProvider, via: Sender, key: bigint, validUntil: number, data: Slice) {
        await provider.internal(via, {
            value: toNano("0.02"),
            body:     beginCell()
                .storeUint(1, 32)
                .storeUint(12345, 64)
                .storeUint(key, 256)
                .storeUint(validUntil, 64)
                .storeSlice(data)
                .endCell(),
        });
    }

    async sendRemove(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: toNano("0.03"),
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell()
                .storeUint(2, 32)
                .storeUint(123456, 64)
                .endCell(),
        });
    }

    async get(provider: ContractProvider, key: bigint){
        const {stack} = await provider.get("get", [
            {type: "int", value: key}
        ])
        return [stack.readBigNumber(), stack.readAddress()]
    }

    async getAll(provider: ContractProvider){
        const {stack} = await provider.get("load_data", [])
        return stack
    }
}
