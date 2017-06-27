interface LazyInterface {
    add(func: Function, ...args: number[]): Lazy;
    evaluate(data: Array<number>): Array<number>;
}

interface Process {
    func: Function,
    args: Array<number>
}

export class Lazy implements LazyInterface {
    private processList: Array<Process> = [];

    /**
     * Push a function onto the list of functions to process `evaluate` array data
     * @param func - the function reference to apply on `evaluate` data
     * @param args - `n` number of arguments to be passed into the evaluation function alongside the evaluate data
     * @returns Lazy - a reference to the current instance of Lazy, for chaining add() calls
     */
    add(func: Function, ...args: number[]): Lazy {
        this.processList.push({func, args});
        return this;
    }

    /**
     * Apply consecutive functions in the process list to the given data array.
     * Also applies given arguments as required
     * Will not mutate data, returns a new array instead.
     * @param data {Array<number>} - an array of numbers to apply to the sequence of functions
     * @returns {Array<number>} - array of computed values, same length as `data` arguments.
     */
    evaluate(data: Array<number>): Array<number> {
        let updatedData = [...data];
        return this.processList
            .map((process: Process) => {
                updatedData = [...this.mapFuncToData(process, updatedData)];
                return updatedData;
            })
            .reduce((accumulator, value, index) => {
                return index === this.processList.length - 1 ?
                    accumulator.concat(value) : accumulator;
            }, []);
    }

    /**
     * Iterates over the given data array and applies the given processList function and arguments to the data
     * @param process - a Process from the processList
     * @param data - array of numbers, whose values are applied on the given function
     * @returns {Array<number>} - a map of the given data array, after the given process is applied
     */
    private mapFuncToData(process: Process, data: Array<number>): number[] {
        return data
            .map((number) => process.func(...process.args, number));
    }
}