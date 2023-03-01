import {Blockchain, OpenedContract, TreasuryContract} from '@ton-community/sandbox';
import {beginCell, Cell, Dictionary, Slice, toNano} from 'ton-core';
import {LessonSeventh} from '../wrappers/LessonSeventh';
import '@ton-community/test-utils';
import {compile} from '@ton-community/blueprint';

const sleep = (time: number) => new Promise((resolve => setTimeout(resolve, time)))

describe('LessonSeventh', () => {
    let code: Cell;
    let lessonSeventh: OpenedContract<LessonSeventh>
    let deployer: OpenedContract<TreasuryContract>

    beforeAll(async () => {
        code = await compile('LessonSeventh');
        const blockchain = await Blockchain.create();



        deployer = await blockchain.treasury('deployer');
        const sender = await blockchain.treasury('sender');

        lessonSeventh = blockchain.openContract(LessonSeventh.createFromConfig({}, code));
        const deployResult = await lessonSeventh.sendDeploy(deployer.getSender(), toNano('0.05'));

        const balance = (await blockchain.getContract(lessonSeventh.address)).balance
        const data: Slice = beginCell().storeAddress(sender.address).endCell().beginParse()
        await lessonSeventh.sendAdd(deployer.getSender(), 111n, 1677309955, data);
        await lessonSeventh.sendAdd(deployer.getSender(), 112n, 1677309955, data);
        await lessonSeventh.sendAdd(deployer.getSender(), 113n, 1677569155, data);
        await lessonSeventh.sendAdd(deployer.getSender(), 114n, 1677569155, data);
    });

    it('should deploy', async () => {


        let elem1 = await lessonSeventh.get(111n)
        let elem2 = await lessonSeventh.get(112n)
        let elem3 = await lessonSeventh.get(113n)
        let elem4 = await lessonSeventh.get(114n)
        console.log(elem1)
        console.log(elem2)
        console.log(elem3)
        console.log(elem4)

        let stackAll = await lessonSeventh.getAll()
        console.log(stackAll)
        console.log("start removing")
        await lessonSeventh.sendRemove(deployer.getSender());
        console.log("end removing")
        stackAll = await lessonSeventh.getAll()
        console.log(stackAll)

        elem3 = await lessonSeventh.get(113n)
        elem4 = await lessonSeventh.get(114n)
        // expect(await lessonSeventh.get(111n)).toThrowError("98")

        console.log(elem3)
        console.log(elem4)

    });
});
