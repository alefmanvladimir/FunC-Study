import { toNano } from 'ton-core';
import { LessonSeventh } from '../wrappers/LessonSeventh';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const lessonSeventh = LessonSeventh.createFromConfig({}, await compile('LessonSeventh'));

    await provider.deploy(lessonSeventh, toNano('0.05'));

    const openedContract = provider.open(lessonSeventh);

    // run methods on `openedContract`
}
