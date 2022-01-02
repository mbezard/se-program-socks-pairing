/**
 * Abstract Class Algo
 */
export default class Algo{
    constructor() {
        if (this.constructor == Algo) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    states = []
    actions = []

    generateStatesAndActions() {
        throw new Error("Method 'generateStatesAndActions()' must be implemented.");
    }

}
