
import { SagaIterator } from 'redux-saga';

function* loadImages(): SagaIterator {
    // We could Handle Async operation here
}

//@ts-ignore
export default function* sampleSaga() {
    // yield takeEvery(sampleTypes.LOAD_IMAGES, loadImages);
}