import { toNano } from 'ton-core';
import { LessonThird } from '../wrappers/LessonThird';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const lessonThird = LessonThird.createFromConfig({}, await compile('LessonThird'));

    await provider.deploy(lessonThird, toNano('0.05'));

    const openedContract = provider.open(lessonThird);

    // run methods on `openedContract`
}
