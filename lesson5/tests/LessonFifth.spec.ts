import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { LessonFifth } from '../wrappers/LessonFifth';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('LessonFifth', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LessonFifth');
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();

        const lessonFifth = blockchain.openContract(LessonFifth.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await lessonFifth.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lessonFifth.address,
            deploy: true,
        });
    });
});
