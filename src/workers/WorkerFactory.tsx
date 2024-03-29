export default class WorkerFactory {
    constructor(workerFunction: Function) {
        const workerCode = workerFunction.toString();
        const workerBlob = new Blob([`(${workerCode})()`]);
        return new Worker(URL.createObjectURL(workerBlob));
    }
}
