import { Blockchain, OpenedContract, TreasuryContract} from '@ton-community/sandbox';
import {Cell, fromNano, toNano} from 'ton-core';
import {LessonThird} from '../wrappers/LessonThird';
import '@ton-community/test-utils';
import {compile} from '@ton-community/blueprint';

describe('LessonThird', () => {
    let code: Cell,
        blockchain: Blockchain,
        deployer,
        sender: OpenedContract<TreasuryContract>,
        owner: OpenedContract<TreasuryContract>,
        lessonThird: OpenedContract<LessonThird>

    beforeAll(async () => {
        code = await compile('LessonThird');
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        sender = await blockchain.treasury('sender');
        owner = await blockchain.treasury('owner');

        lessonThird = blockchain.openContract(LessonThird.createFromConfig({owner: owner.address}, code));

        await lessonThird.sendDeploy(deployer.getSender(), toNano('0.05'));
    });

    it('should send ton to owner from sender', async () => {
        const balanceBefore = (await blockchain.getContract(owner.address)).balance
        await lessonThird.sendMessage(sender.getSender(), toNano("123"))
        const balanceAfter = (await blockchain.getContract(owner.address)).balance
        expect(balanceAfter).toBeGreaterThan(balanceBefore)
    });

    it("not should send ton to owner from owner", async ()=>{
        const balanceBefore = (await blockchain.getContract(owner.address)).balance
        await lessonThird.sendMessage(owner.getSender(), toNano("123"))
        const balanceAfter = (await blockchain.getContract(owner.address)).balance
        const balanceOfContract = (await blockchain.getContract(lessonThird.address)).balance
        expect(balanceBefore).toBeGreaterThan(balanceAfter)
        expect(Number(fromNano(balanceOfContract))).toBeCloseTo(123)
    })
});
