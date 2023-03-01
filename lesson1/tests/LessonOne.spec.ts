import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { LessonOne } from '../wrappers/LessonOne';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('LessonOne', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LessonOne');
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();

        const lessonOne = blockchain.openContract(LessonOne.createFromConfig({initState: 10}, code));

        const deployer = await blockchain.treasury('deployer');
        console.log("contract address - " + lessonOne.address.toString())
        const deployResult = await lessonOne.sendDeploy(deployer.getSender(), toNano('0.5'));
        // console.log(deployResult.transactions)
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lessonOne.address,
            deploy: true,
        });

        const res = await lessonOne.sendTrx(deployer.getSender(), 25)
        console.log(res)
        const total = await lessonOne.getTotal()
        console.log("total - ", total)
    });
});
