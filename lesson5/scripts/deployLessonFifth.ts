import { toNano } from 'ton-core';
import { LessonFifth } from '../wrappers/LessonFifth';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const lessonFifth = LessonFifth.createFromConfig({}, await compile('LessonFifth'));

    await provider.deploy(lessonFifth, toNano('0.05'));

    const openedContract = provider.open(lessonFifth);

    // run methods on `openedContract`
}
