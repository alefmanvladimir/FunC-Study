import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type LessonOneConfig = {
    initState: number
};

export function lessonOneConfigToCell(config: LessonOneConfig): Cell {
    return beginCell().storeUint(config.initState, 64).endCell();
}

export class LessonOne implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LessonOne(address);
    }

    static createFromConfig(config: LessonOneConfig, code: Cell, workchain = 0) {
        const data = lessonOneConfigToCell(config);
        const init = { code, data };
        return new LessonOne(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            bounce: false
        });
    }

    async getTotal(provider: ContractProvider) {
        const {stack} = await provider.get("get_total", [])
        return stack.readBigNumber()
    }

    async sendTrx(provider: ContractProvider, via: Sender, value: number){
        const messageBody = beginCell()
            .storeUint(value, 32)
            .endCell()

        await provider.internal(via, {
            value: "0.002",
            body: messageBody
        })
    }
}
