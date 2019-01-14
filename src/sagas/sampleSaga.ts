import { takeEvery } from 'redux-saga/effects';
import { types as sampleTypes } from '../actions/sampleActions';
import { SagaIterator } from 'redux-saga';

function* loadImages(): SagaIterator {
    console.log('abc');
}

export default function* sampleSaga() {
    yield takeEvery(sampleTypes.LOAD_IMAGES, loadImages);
}